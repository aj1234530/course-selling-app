"use client";
import React from "react";
import axios from "axios";
import { useState, SetStateAction } from "react";
// import { useRouter } from "next/router";
interface response {
  data: {
    token: string;
  };
  status: number;
}
function SignupModal({
  setIsSignupModalOpen,
}: {
  setIsSignupModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  //   const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  }); //used defautl empty string
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setMessage("signing up");
      const response: response = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_SIGNUP}`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setMessage("Signup Successful");
        // router.push("/browse");
      }
    } catch (error) {
      setMessage("Signup failed");
      console.log(error);
    }
  };
  return (
    <div
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
    >
      <div className="relative p-4 w-full max-w-xl max-h-full border rounded-lg ">
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-5 justify-center w-full"
        >
          <div className="flex flex-col">
            <label>Enter username</label>
            <input
              type="text"
              placeholder="username"
              className="border rounded-lg !p-2"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label>Enter email</label>
            <input
              type="email"
              placeholder="email"
              className="border rounded-lg !p-2"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label>Enter Password</label>
            <input
              type="password"
              placeholder="enter password"
              className="border rounded-lg !p-2"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setIsSignupModalOpen(false)}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Close
            </button>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default SignupModal;
