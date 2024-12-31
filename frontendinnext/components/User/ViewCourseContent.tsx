"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
function ViewCourseContent({ id }: { id: string }) {
  console.log("course params", id);
  interface courseRootDirectory {
    title: string;
    thumbnail: string;
    //some sort of recursion will come to play when the nested folder comes into play
    folder: Folder[];
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
  interface response {
    data: {
      token: string;
      rootDirectory: courseRootDirectory;
    };
    status: number;
  }
  // const [courseLoadingMessage, setcourseLoadingMessage] = useState<
  //   string | null
  // >(null);
  // const [course, setCourse] = useState<Course[]>([]);
  const [courseRootDirectory, setCourseRootDirectory] =
    useState<courseRootDirectory | null>(null);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // setcourseLoadingMessage("Authorization token is missing.");
          return;
        }

        const response: response = await axios.get(
          `${process.env.NEXT_PUBLIC_ACCESS_COURSE}${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          console.log(response);
          // setCourse(response.data.course); //
          setCourseRootDirectory(response.data.rootDirectory);
        } else {
          // setcourseLoadingMessage("Failed to load course");
        }
      } catch (error) {
        console.error(error);
        // setcourseLoadingMessage("Something went wrong.");
      }
    };

    fetchCourse(); // Call the async function
  }, []); //because the useeffect is fetching the data from sever so to update the ui with new data , useeffect has to re-render
  return (
    <div>
      <div className="flex items-center justify-center p-4">
        <h1 className="text-3xl font-bold">Your Course Content</h1>
      </div>
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ViewCourseContent;
