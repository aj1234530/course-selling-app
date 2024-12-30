1. some sort of recursion will come into play
   1. const folders = [
  {
    name: "Folder 1",
    subfolders: [
      {
        name: "Subfolder 1.1",
        subfolders: [
          { name: "Subfolder 1.1.1" },
          { name: "Subfolder 1.1.2" },
        ],
      },
      { name: "Subfolder 1.2" },
    ],
  },
  {
    name: "Folder 2",
    subfolders: [
      { name: "Subfolder 2.1" },
      {
        name: "Subfolder 2.2",
        subfolders: [
          { name: "Subfolder 2.2.1" },
          { name: "Subfolder 2.2.2" },
        ],
      },
    ],
  },
];