import Link from "next/link";
const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-bold mb-6">Main Menu</h2>
      <a href="#" className="block py-2 px-6  hover:bg-gray-200">
        🏡Home
      </a>
      <Link href="/browse" className="block py-2 px-6  hover:bg-gray-200">
        📕Browse Courses
      </Link>
      <Link href="/admin/login" className="block py-2 px-6  hover:bg-gray-200">
        Admin Login
      </Link>
    </div>
  );
};

export default Sidebar;
