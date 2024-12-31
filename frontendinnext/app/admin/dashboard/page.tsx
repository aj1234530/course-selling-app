"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import CreateCourseFormModal from "@/components/admin/CreateCourseFormModal";
import { ToastContainer } from "react-toastify";
import { triggerToast } from "@/lib/helperFunctions/errorAndSuccessToast";
interface course {
  id: string;
  courseTitle: string;
  courseDescription: string;
  price: string;
}
interface response {
  data: {
    token: string;
    yourcourses: course[];
  };
  status: number;
}
function Dashboard() {
  const [courses, setCourses] = useState<course[]>([]);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [updateUI, setUpdateUi] = useState(false);
  //handle course delete(not working the bacekend route yet(foreign key violation))
  const handleCourseDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_COURSE_DELETE_ROUTE}${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        triggerToast("Success, course deleted", "success");
        setUpdateUi((p) => !p);
      }
    } catch (error) {
      triggerToast("course deletion failed", "error");
      console.log(error);
    }
    //request to backend and update the ui
  };

  useEffect(() => {
    const fetchData = async () => {
      //putting any for now
      const token = localStorage.getItem("token");
      const response: response = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_ROUTE}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      setCourses(response.data.yourcourses);
      console.log(courses);
    };
    fetchData();
  }, [courseModalOpen, updateUI]); //on modal state chnage re-render to update the course if added any

  // css written with gpt
  return (
    <div className="p-6 font-sans">
      <ToastContainer />
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-4">My Courses</h1>
        <button
          onClick={() => setCourseModalOpen(true)}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create New Course
        </button>
      </div>
      {courses.length === 0 && (
        <div className="text-gray-500 italic">No courses found</div>
      )}
      {courses.map((course) => (
        <div
          key={course.id}
          className="border border-gray-200 p-4 mb-4 rounded-lg shadow"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {course.courseTitle}
            </h3>
            <p className="text-gray-600 my-2">{course.courseDescription}</p>
            <p className="font-bold text-blue-600">${course.price}</p>
            <div className="display flex flex-row gap-10">
              <Link href={`courses/${course.id}`}>
                {" "}
                <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                  Manage
                </button>
              </Link>
              {/* using id of the course to delete the delete button has id of the ,we will extract and delete */}
              {/* <button
                id={`${course.id}`}
                className="mt-3 px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-700"
              >
                Edit(not implemented yet)
              </button> */}
              <button
                id={`${course.id}`}
                onClick={() => handleCourseDelete(course.id)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {courseModalOpen && (
        <CreateCourseFormModal setCourseModalOpen={setCourseModalOpen} />
      )}
    </div>
  );
}

export default Dashboard;
