"use client";

import React, { useEffect, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { AddGalleryPost, AddVideoTypes } from "../utils/Interface";
import { addGalleryPost, AddVideo } from "../utils/DataServices";
import { Switch } from "../ui/switch";
import LoginWarning from "../ui/LoginWarning";

interface OpenPostModalProps {
  isPosted: (value: boolean) => void;
}

const OpenPostModal: React.FC<OpenPostModalProps> = ({ isPosted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  
  // Upload progress states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) setUserId(Number(storedId));
  }, []);

  // Image compression function for mobile optimization
  const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = (width * maxWidth) / height;
            height = maxWidth;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImagePost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const maxFileSize = 20 * 1024 * 1024;
    if (selectedFile.size > maxFileSize) {
      alert("File size must be under 20MB.");
      return;
    }

    let processedFile = selectedFile;
    
    // Compress images for mobile optimization
    if (selectedFile.type.startsWith("image/") && !isVideo) {
      setUploadStatus("Compressing image...");
      processedFile = await compressImage(selectedFile);
    }

    const previewUrl = URL.createObjectURL(processedFile);
    setPreview(previewUrl);
    setFile(processedFile);
    setUploadStatus("");
  };

  const handleSubmit = async () => {
    if (!file || userId === null) {
      alert("Missing file or user ID");
      return;
    }

    if (!titleInput.trim()) {
      alert("Please enter a title");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      setUploadStatus("Preparing upload...");

      const uploadRef = isVideo
        ? ref(storage, `galleryvideos/${userId}_${Date.now()}_${file.name}`)
        : ref(storage, `gallerypicture/${userId}_${Date.now()}_${file.name}`);

      // Use uploadBytesResumable for progress tracking
      const uploadTask = uploadBytesResumable(uploadRef, file);

      // Monitor upload progress
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
          
          switch (snapshot.state) {
            case 'paused':
              setUploadStatus('Upload paused');
              break;
            case 'running':
              setUploadStatus(`Uploading... ${Math.round(progress)}%`);
              break;
          }
        }, 
        (error) => {
          console.error('Upload error:', error);
          setUploadStatus('Upload failed');
          setIsUploading(false);
        }, 
        async () => {
          setUploadStatus('Processing...');
          
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            if (isVideo) {
              const inputFieldObj: AddVideoTypes = {
                VideoUrl: downloadURL,
                CreatorId: userId,
                Title: titleInput,
                IsDeleted: false,
              };
              const res = await AddVideo(inputFieldObj);
              if (res) {
                console.log("Video post created:", res);
                isPosted(true);
              }
            } else {
              const inputFieldObj: AddGalleryPost = {
                ImageUrl: downloadURL,
                CreatorId: userId,
                Title: titleInput,
                Description: descriptionInput,
                IsDeleted: false,
              };
              const res = await addGalleryPost(inputFieldObj);
              if (res) {
                console.log("Image post created:", res);
                isPosted(true);
              }
            }
            
            setUploadStatus('Upload complete!');
            setTimeout(() => resetModal(), 1000);
          } catch (error) {
            console.error("Error creating post:", error);
            setUploadStatus('Failed to create post');
            setIsUploading(false);
          }
        }
      );

    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus('Upload failed');
      setIsUploading(false);
    }
  };

  const resetModal = () => {
    setIsOpen(false);
    setPreview(null);
    setTitleInput("");
    setDescriptionInput("");
    setFile(null);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadStatus("");
  };

  return (
    <>
      {/* Open Modal Button */}
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => setIsOpen(true)}
        >
          Upload
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4"
          onClick={!isUploading ? resetModal : undefined}
        >
          <div
            className="bg-white text-black p-6 rounded-xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {userId === null ? (
              <LoginWarning />
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">
                  Upload {isVideo ? 'Video' : 'Image'}
                </h2>

                {preview && (
                  <div className="mb-4">
                    {isVideo ? (
                      <video
                        controls
                        src={preview}
                        className="w-full h-[250px] object-contain rounded border"
                      />
                    ) : (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-[250px] object-contain rounded border"
                      />
                    )}
                  </div>
                )}

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-700">
                        {uploadStatus}
                      </span>
                      <span className="text-sm text-blue-600">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept={isVideo ? "video/*" : "image/*"}
                  onChange={handleImagePost}
                  disabled={isUploading}
                  className="mb-2 w-full cursor-pointer file:cursor-pointer file:rounded file:border file:border-gray-300 file:px-4 file:py-2 file:bg-white file:hover:bg-blue-50 file:text-sm file:text-gray-700 transition disabled:opacity-50"
                />

                <input
                  type="text"
                  placeholder="Title *"
                  className="w-full mb-2 p-2 rounded border"
                  value={titleInput}
                  disabled={isUploading}
                  onChange={(e) => setTitleInput(e.target.value)}
                />

                {!isVideo && (
                  <textarea
                    placeholder="Description"
                    className="w-full mb-2 p-2 rounded border"
                    value={descriptionInput}
                    disabled={isUploading}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                  />
                )}

                <div className="w-full flex items-center gap-2 mb-4">
                  <Switch
                    checked={isVideo}
                    disabled={isUploading}
                    onCheckedChange={(checked: boolean) => {
                      setIsVideo(checked);
                      setPreview(null);
                      setFile(null);
                    }}
                  />
                  <span>{isVideo ? "Video" : "Image"}</span>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
                    onClick={resetModal}
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Cancel'}
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:bg-gray-400"
                    onClick={handleSubmit}
                    disabled={isUploading || !file || !titleInput.trim()}
                  >
                    {isUploading ? 'Uploading...' : 'Submit'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OpenPostModal;