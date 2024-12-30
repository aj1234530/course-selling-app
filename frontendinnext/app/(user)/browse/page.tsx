"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import SignupModal from "@/components/User/SignupModal";
import LoginModal from "@/components/User/LoginModal";
import { ToastContainer } from "react-toastify";
import { triggerToast } from "@/lib/helperFunctions/errorAndSuccessToast";

interface course {
  id: string;
  courseTitle: string;
  courseDescription: string;
  price: string;
}
function Browse() {
  const [isSignupModalOpen, setIsSigupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [courses, setCourses] = useState<course[]>([]);

  const handleCourseBuy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //if not logged in redirect
    try {
      const token = localStorage.getItem("token");
      console.log("token sent", token);
      const response = await axios.post(
        `http://localhost:3000/api/v1/user/course/buy/${e.currentTarget.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        triggerToast("course purchased success", "success");
      }
      if (response.status === 409) {
      }
    } catch (error: unknown) {
      console.log(error);

      triggerToast("course purchase failed", "error");
    }
  };
  interface response {
    data: {
      courses: course[];
    };
  }
  useEffect(() => {
    const fetchData = async () => {
      //putting any for now

      const response: response = await axios.get(
        "http://localhost:3000/api/v1/user/courses"
      );
      console.log(response);
      setCourses(response.data.courses);
      console.log(courses);
    };
    fetchData();
  }, []); //on modal state chnage re-render to update the course if added any

  // css written with gpt
  return (
    <div className="p-6 font-sans">
      <ToastContainer />
      <Navbar
        setIsSignupModalOpen={setIsSigupModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
      <div className="flex flex-row justify-between"></div>
      {courses.length === 0 && (
        <div className="text-gray-500 italic">No courses found</div>
      )}
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex  border border-gray-200 p-4 mb-4 rounded-lg shadow"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {course.courseTitle}
            </h3>
            <p className="text-gray-600 my-2">{course.courseDescription}</p>
            <p className="font-bold text-blue-600">${course.price}</p>
            <div className="display flex flex-row gap-10">
              {" "}
              <button
                type="button"
                id={`${course.id}`}
                onClick={handleCourseBuy}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Buy
              </button>
            </div>
          </div>
          {isSignupModalOpen && (
            <SignupModal setIsSignupModalOpen={setIsSigupModalOpen} />
          )}
          {isLoginModalOpen && (
            <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Browse;
