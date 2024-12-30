import axios from "axios";
import { useState } from "react";
//needs id of the course to created the subfoldery
function CreateSubfolder({
  id,
  setCreateFolderModalOpen,
}: {
  id: string;
  setCreateFolderModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [folderTitle, setFolderTitle] = useState("");
  const handleFolderCreation = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/admin/course/addfolder/${id}`,
        {
          title: folderTitle,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setCreateFolderModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
    >
      <form className="space-y-4 p-4 max-w-md mx-auto">
        <div className="flex flex-col space-y-2">
          <input
            onChange={(e) => setFolderTitle(e.target.value)}
            type="text"
            placeholder="Enter Folder Name"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleFolderCreation}
          >
            Add SubFolder
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSubfolder;
