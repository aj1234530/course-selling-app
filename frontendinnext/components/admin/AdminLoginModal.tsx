"use client";

import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { triggerToast } from "@/lib/helperFunctions/errorAndSuccessToast";
import Link from "next/link";

export function AdminLoginModal() {
  // const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  interface response {
    data: {
      token: string;
    };
    status: number;
  }
  const handleClick = async () => {
    setLoginMessage("Please wait");
    try {
      const response: response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_LOGIN_ROUTE}`,
        {
          username: username,
          password: password,
        }
      );
      if (response.status === 200) {
        setLoginMessage(null);
        localStorage.setItem("token", response.data.token);
        triggerToast("login successful", "success");
        setIsLoginSuccess(true);
      }

      console.log(response);
      // router.push("/admin/dashboard");
    } catch (error) {
      triggerToast("login failed", "error");
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
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
          <div className="flex flex-row gap-10">
            <button
              type="button"
              className="border p-2 rounded"
              onClick={handleClick}
            >
              Login
            </button>
            {isLoginSuccess && (
              <Link href="/admin/dashboard">
                <button
                  type="button"
                  className="border bg-green-500 p-2 rounded"
                  onClick={handleClick}
                >
                  Go to Dashboard
                </button>
              </Link>
            )}
            {loginMessage && <div>{loginMessage}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
