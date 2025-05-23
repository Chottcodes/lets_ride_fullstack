import { useState, useEffect } from "react";
import { GetUserProfile } from "@/components/utils/DataServices";

export function useProfilePicture() {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const storedId = localStorage.getItem("ID");
      if (storedId) {
        const userData = await GetUserProfile(Number(storedId));
        setProfilePicture(userData.profilePicture);
        localStorage.setItem("profilePicture", userData.profilePicture);
      }
    };

    fetchProfilePicture();
  }, []);

  return profilePicture;
}
