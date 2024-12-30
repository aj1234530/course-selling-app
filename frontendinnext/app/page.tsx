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
    <div>
      <Navbar
        setIsSignupModalOpen={setIsSigupModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
      <Sidebar />
      {isSignupModalOpen && (
        <SignupModal setIsSignupModalOpen={setIsSigupModalOpen} />
      )}
      {isLoginModalOpen && (
        <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
      )}
    </div>
  );
}
