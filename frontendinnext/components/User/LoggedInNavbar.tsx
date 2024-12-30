import Link from "next/link";
import React from "react";

const LoggedInNavbar = () => {
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
          {/* link to purchased courses */}
          <Link href="#">
            {" "}
            <button className="px-5 py-2 bg-blue-500 text-white rounded-md">
              My Courses
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;
