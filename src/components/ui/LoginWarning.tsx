"use client";

import React from "react";
import { useRouter } from "next/navigation"; 

const LoginWarning = () => {
  const router = useRouter();

  return (
    <div>
      <main className="text-center space-y-2">
        <h1>
          Please{" "}
          <button
            onClick={() => router.push("/pages/Login/loginPage")}
            className="text-blue-500 hover:text-blue-700"
          >
            login
          </button>{" "}
          to post in the gallery.
        </h1>
        <h1>
          No Account? Sign up{" "}
          <button
            onClick={() => router.push("/pages/Login/signupPage")}
            className="text-blue-500 hover:text-blue-700"
          >
            here!
          </button>
        </h1>
      </main>
    </div>
  );
};

export default LoginWarning;
