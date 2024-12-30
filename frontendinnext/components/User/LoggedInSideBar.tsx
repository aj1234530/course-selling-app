import Link from "next/link";
import React from "react";

const LoggedInSideBar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-bold mb-6">Main Menu</h2>
      <Link href="/browse" className="block py-2 px-6  hover:bg-gray-200">
        🏡Home
      </Link>
      <Link href="/mycourses" className="block py-2 px-6  hover:bg-gray-200">
        📕My Courses
      </Link>
    </div>
  );
};

export default LoggedInSideBar;
