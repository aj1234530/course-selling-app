"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { triggerToast } from "@/lib/helperFunctions/errorAndSuccessToast";
import CreateSubfolder from "./addcontents/CreateSubFolder";
import UploadVideo from "./addcontents/UploadVideo";
function ManageACourse({ id }: { id: string }) {
  interface Course {
    id: string;
    courseTitle: string;
    courseDescription: string;
    price: number;
  }
  interface Video {
    id: string;
    title: string;
    url: string;
  }
  interface Link {
    id: string;
    link: string;
  }
  interface Folder {
    title: string;
    id: string;
    videos: Video[];
    link: Link[];
  }
  interface courseRootDirectory {
    title: string;
    thumbnail: string;
    //some sort of recursion will come to play when the nested folder comes into play
    folder: Folder[];
  }
  interface response {
    data: {
      token: string;
      requestedCourse: Course;
      rootDirectory: courseRootDirectory;
    };
    status: number;
  }
  //VIDEO_DELETE: on click the button it will delete the ,(for now not updating ui immediately, no confirm courseLoadingMessage)
  const handleVideoDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_VIDEO_DELETE_ROUTE}${id}`
      );

      if (response.status === 200) {
        triggerToast("delete successful", "success");
        setUpdateUi((prev) => !prev); //for updating ui
      } else {
        triggerToast("delete failed", "error");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFolderDelete = async (id: string) => {
    try {
      //id is getting extracted from te button (it was set during map over)

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_DELETE_ROUTE}${id}`
      );

      if (response.status === 200) {
        triggerToast("folder delete successful", "success");
        setUpdateUi((prev) => !prev);
      } else {
        triggerToast("folder delete failed", "error");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const [updateUI, setUpdateUi] = useState(false); //this state i used for updating ui if nothing was there (i will flip it - to render the component)
  const [isUploadVideoModelOpen, setIsUploadVideoModelOpen] = useState(false);
  const [folderId, setFolderId] = useState<string | null>(null); //for passing prop to video upload fxn
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [course, setCourse] = useState<null | Course>(null);
  const [courseRootDirectory, setCourseRootDirectory] =
    useState<courseRootDirectory | null>(null);
  // const [folders,setFolder] = useState
  const [courseLoadingMessage, setcourseLoadingMessage] = useState<
    string | null
  >(null);

  //VIDEO upload - rest is mange in the video upload component
  const handleVideoUpload = (id: string) => {
    setFolderId(id);
    console.log(folderId);
    setIsUploadVideoModelOpen(true);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setcourseLoadingMessage("Authorization token is missing.");
          return;
        }

        const response: response = await axios.get(
          `${process.env.NEXT_PUBLIC_ADMIN_FETCH_COURSE_ROUTE}${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          console.log(response);
          setCourse(response.data.requestedCourse);
          setCourseRootDirectory(response.data.rootDirectory);
        } else {
          setcourseLoadingMessage("Failed to load course");
        }
      } catch (error) {
        console.error(error);
        setcourseLoadingMessage("Something went wrong.");
      }
    };

    fetchCourse(); // Call the async function
  }, [isCreateFolderModalOpen, isUploadVideoModelOpen, updateUI]); //because the useeffect is fetching the data from sever so to update the ui with new data , useeffect has to re-render
  return (
    <div>
      <ToastContainer />
      {course ? (
        <div>
          <div className="flex justify-center">
            <h1>{course.courseTitle}</h1>
          </div>
          <div></div>

          {/* for 4 buttons on the manage course page  */}
          <div className="flex flex-row gap-10  justify-center p-4">
            {/* below button made to add vid/links/notes is on hold as rootdirctory has no backend support for it */}
            {/* <button
              disabled
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Notes
            </button>
            <button
              disabled
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Upload Video
            </button>
            <button
              disabled
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Links
            </button> */}
            <button
              onClick={() => setIsCreateFolderModalOpen(true)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add SubFolder
            </button>
          </div>

          {/* mapping over the root course directory(for the folder show up) */}
          <div>
            <div className="flex p-4 items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="text-blue-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 3l9 9h-6v9h-6v-9H3l9-9z" />
              </svg>
              <h2 className="text-lg font-semibold border p-1 rounded">
                {courseRootDirectory?.title}
              </h2>
            </div>
            <div className="space-y-4 p-4">
              {courseRootDirectory?.folder.map((el) => (
                <div key={el.id}>
                  <div className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 6a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 001 1h8a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V6z"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-800 flex-1">
                      {el.title}
                    </h3>

                    {/* adding buttons for managing each folder(add vid, delete,add link, add notes) */}
                    <div className="flex space-x-2">
                      {/* below approach to dirctly map a compo did not worked , had to use button and manupulaet */}
                      {/* <UploadVideo
                      // problem is here , it will pass the last state value reme
                        folderId={el.id}
                        isUploadVideoModelOpen={isUploadVideoModelOpen}
                        setIsUploadVideoModelOpen={setIsUploadVideoModelOpen}
                      /> */}
                      <button
                        type="button"
                        id={el.id}
                        onClick={() => handleVideoUpload(el.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                      >
                        Add Video
                      </button>
                      {/* <button
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                        // onClick={() => handleAddNotes(el.id)}
                      >
                        Add Notes
                      </button> */}
                      {/* <button 
                        className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-200"
                        // onClick={() => handleAddLink(el.id)}
                      >
                        Add Link
                      </button> */}
                      <button
                        id={el.id}
                        onClick={() => handleFolderDelete(el.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                        // onClick={() => handleDelete(el.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* mapping video for each week(el is outer folder here) */}
                  {el.videos.map((el) => (
                    <div
                      key={el.id}
                      style={{
                        margin: "10px",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {/* Play SVG Icon at the start */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        style={{
                          marginRight: "10px", // Space between the icon and the title
                          cursor: "pointer", // Makes the icon look clickable
                          fill: "gray", // Color of the icon
                        }}
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      {/* TODO  - when one clicks it it either goes to new route or pop up video play */}
                      <a
                        href={el.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "blue",
                          fontSize: "16px",
                          flex: 1, // Takes available space
                        }}
                      >
                        {el.title}
                      </a>

                      {/* Delete Button */}
                      <button
                        id={`${el.id}`}
                        onClick={() => handleVideoDelete(el.id)}
                        style={{
                          backgroundColor: "#ff4d4f",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "6px 12px",
                          cursor: "pointer",
                          fontSize: "14px",
                          marginLeft: "10px",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {isCreateFolderModalOpen && course && (
            <CreateSubfolder
              id={course.id}
              setCreateFolderModalOpen={setIsCreateFolderModalOpen}
            />
          )}
          {/* this will open up when the button is cliced and has folder id (from id) */}
          {isUploadVideoModelOpen && folderId && (
            <UploadVideo
              folderId={folderId}
              isUploadVideoModelOpen={isUploadVideoModelOpen}
              setIsUploadVideoModelOpen={setIsUploadVideoModelOpen}
            />
          )}
        </div>
      ) : (
        <div>{courseLoadingMessage}</div>
      )}
    </div>
  );
}

export default ManageACourse;
//manage course page - can edit course details
//add assests
