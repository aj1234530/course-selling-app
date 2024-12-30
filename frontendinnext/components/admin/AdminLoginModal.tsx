"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export function AdminLoginModel() {
  // const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    try {
      const response: any = await axios.post(
        "http://localhost:3000/api/v1/auth/admin/signin",
        {
          username: username,
          password: password,
        }
      );
      localStorage.setItem("token", response.data.token);
      console.log(response);
      // router.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block ">
            Enter Username
          </label>
          <input
            id="username"
            type="text"
            className="border border-gray-300"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block ">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            className="border border-gray-300"
          />
        </div>{" "}
        <button
          type="button"
          className="border p-2 rounded"
          onClick={handleClick}
        >
          Login
        </button>
      </div>
    </div>
  );
}
