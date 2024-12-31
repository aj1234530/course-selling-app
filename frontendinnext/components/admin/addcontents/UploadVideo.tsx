import supabase from "@/lib/helperFunctions/supabase";
import { useRef, useState } from "react";
import axios from "axios";
import { errorMonitor } from "events";

interface UploadVideoProps {
  folderId: string;
  isUploadVideoModelOpen: boolean;
  setIsUploadVideoModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function UploadVideo({
  folderId,
  // isUploadVideoModelOpen,
  setIsUploadVideoModelOpen,
}: UploadVideoProps) {
  // const [videoUrl, setVideoUrl] = useState<null | string>(null); //forsending to db
  const fileUrl = useRef<null | string>(null); //
  const [file, setFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState<null | string>(null);
  const [uploadingMessage, setUploadingMessage] = useState(false);
  async function handleVideoAddToDb() {
    //only links is used for now(no file select)
    console.log(folderId); //checking the folder id
    try {
      if (file) {
        setUploadingMessage(true); // Show uploading message
        const fileName = `${Date.now()}-${file.name}`;

        // Uploading  the file to supabase to the bucket, will return data and error
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("course-selling-app")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          setUploadingMessage(false);
          return;
        }

        // if no error get the public url
        const { data: publicUrlData } = await supabase.storage
          .from("course-selling-app")
          .getPublicUrl(uploadData.path);
        //if not got public url
        if (!publicUrlData) {
          console.error("Error getting public URL:");
          setUploadingMessage(false);
          return;
        }

        if (publicUrlData?.publicUrl) {
          fileUrl.current = publicUrlData?.publicUrl;
          console.log(fileUrl);
          console.log(publicUrlData?.publicUrl, "dfasdfdsf");
          // ***Set the public URL(from object returned from supabase ) tot the video url to send to the backend***
        } else {
          console.error("Public URL is null");
        }
        setUploadingMessage(false); // Hide uploading message
      }

      //saving video to a particular folder(using folder id)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_ADD_VIDEO_ROUTE}${folderId}`,
        {
          videoUrl: fileUrl.current, //what ever
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
            {/* <input
              
              type="text"
              required
              placeholder="Enter Video Url(or choose file)"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
            <input
              // onChange={(e) => setFolderTitle(e.target.value)}
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
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
          {uploadingMessage && <p>Uploading</p>}
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;

//export a button
//folder id or rootcourseid as parameter
