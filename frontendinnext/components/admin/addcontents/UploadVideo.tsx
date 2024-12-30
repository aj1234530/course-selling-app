import { title } from "process";
import { useState } from "react";
import axios from "axios";
interface UploadVideoProps {
  folderId: string;
  isUploadVideoModelOpen: boolean;
  setIsUploadVideoModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function UploadVideo({
  folderId,
  isUploadVideoModelOpen,
  setIsUploadVideoModelOpen,
}: UploadVideoProps) {
  const [videoUrl, setVideoUrl] = useState<null | string>(null); //forsending to db
  const [videoTitle, setVideoTitle] = useState<null | string>(null);
  async function handleVideoAddToDb() {
    //only links is used for now(no file select)
    console.log(folderId); //checking the folder id
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/admin/addvideo/${folderId}`,
        {
          videoUrl: videoUrl,
          videoTitle: videoTitle,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setIsUploadVideoModelOpen(false);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div
        aria-hidden="true"
        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
      >
        <form className="space-y-4 p-4 max-w-md mx-auto">
          <div className="flex flex-col space-y-2">
            <input
              onChange={(e) => setVideoTitle(e.target.value)}
              type="text"
              required
              placeholder="Enter Video Title"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              onChange={(e) => setVideoUrl(e.target.value)}
              type="text"
              required
              placeholder="Enter Video Url"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              // onChange={(e) => setFolderTitle(e.target.value)}
              type="file"
              accept="video/*"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-row gap-4">
              <button
                type="button"
                className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setIsUploadVideoModelOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleVideoAddToDb}
              >
                Upload Video
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;

//export a button
//folder id or rootcourseid as parameter
