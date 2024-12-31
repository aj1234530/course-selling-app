"use client";
import React, { useState } from "react";
import axios from "axios";

function CreateCourseFormModal({
  setCourseModalOpen,
}: {
  setCourseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    price: "", //need to be parsed on request
  });
  const [message, seMessage] = useState<string | null>(null);

  async function handleCourseCreation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_CREATE_COURSE_ROUTE}`,
        {
          courseTitle: formData.courseTitle,
          courseDescription: formData.courseDescription,
          price: formData.price,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        seMessage("Course added successfully");
      }
      console.log(response);
    } catch (error: unknown) {
      seMessage(`Course creation failed`);
      console.log(error);
    }
  }
  return (
    <div
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
    >
      <div className="relative p-4 w-full max-w-xl max-h-full border rounded-lg ">
        <form
          onSubmit={handleCourseCreation}
          className="flex flex-col gap-5 justify-center w-full"
        >
          <div className="flex flex-col">
            <label>Course title</label>
            <input
              type="text"
              placeholder="Enter course name..."
              className="border rounded-lg !p-2"
              onChange={(e) =>
                setFormData({ ...formData, courseTitle: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter course Description..."
              className="border rounded-lg !p-2"
              onChange={(e) =>
                setFormData({ ...formData, courseDescription: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter Price..."
              className="border rounded-lg !p-2"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setCourseModalOpen(false)}
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
            {message && <p>{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourseFormModal;
