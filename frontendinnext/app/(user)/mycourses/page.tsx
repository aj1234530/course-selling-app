"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
interface course {
  id: string;
  courseTitle: string;
  courseDescription: string;
  price: string;
}
function MyCourses() {
  const [courses, setCourses] = useState<course[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      //putting any for now
      const token = localStorage.getItem("token");
      const response: any = await axios.get(
        "http://localhost:3000/api/v1/user/myzone",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      setCourses(response.data.courses);
      console.log(courses);
    };
    fetchData();
  }, []);
  return (
    <div className="p-6 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Courses</h1>
      </div>
      {courses?.length === 0 ? (
        <div className="text-gray-500 italic">No courses found</div>
      ) : (
        courses?.map(({ id, courseTitle, courseDescription, price }) => (
          <div
            key={id}
            className="border border-gray-300 p-4 rounded-lg shadow-sm mb-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {courseTitle}
            </h3>
            <p className="text-gray-600 my-2">{courseDescription}</p>
            <p className="font-bold text-blue-600">${price}</p>
            <div className="flex gap-4 mt-3">
              <Link href={`/mycourses/${id}`}>
                <button
                  id={`${id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Content
                </button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyCourses;
