"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import SignupModal from "@/components/User/SignupModal";
import LoginModal from "@/components/User/LoginModal";
export default function Home() {
  const [isSignupModalOpen, setIsSigupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <div className="app-container flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content flex-1">
        {/* Navbar */}
        <Navbar
          setIsSignupModalOpen={setIsSigupModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />

        {/* Modals */}
        {isSignupModalOpen && (
          <SignupModal setIsSignupModalOpen={setIsSigupModalOpen} />
        )}
        {isLoginModalOpen && (
          <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
        )}

        {/* Page Content */}
        <div className="page-content p-6">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="text-gray-600 mt-2">
            Browser Courses Or Login to Continue
          </p>
        </div>
      </div>
    </div>
  );
}
