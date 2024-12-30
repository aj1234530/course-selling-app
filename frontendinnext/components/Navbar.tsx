"use client";

import { SetStateAction } from "react";

const Navbar = ({
  setIsSignupModalOpen,
  setIsLoginModalOpen,
}: {
  setIsSignupModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsLoginModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav className="sticky top-0">
      <div className="flex p-2 bg-white shadow justify-between">
        <div className="">
          <img src="/logo100x.jpg" className="w-10 rounded-full "></img>
        </div>
        <div className="space-x-4">
          <input
            placeholder="seach"
            className="px-5 py-1 border rounded-full "
          ></input>
          <button
            className="px-5 py-2 text-white bg-blue-500 rounded-md"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignupModalOpen(true)}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
