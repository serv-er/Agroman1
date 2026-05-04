import {
  FaHome,
  FaSeedling,
  FaRobot,
  FaStore,
  FaNewspaper,
  FaFileAlt,
  FaMicroscope
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar() {

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },

    {
      title: "Crop Recommendation",
      icon: <FaSeedling />,
      path: "/dashboard/recommendation",
    },

    {
      title: "AI Assistant",
      icon: <FaRobot />,
      path: "/dashboard/ai-chat",
    },

    {
      title: "Marketplace",
      icon: <FaStore />,
      path: "/dashboard/marketplace",
    },

    {
      title: "News",
      icon: <FaNewspaper />,
      path: "/dashboard/news",
    },

    {
      title: "Schemes",
      icon: <FaFileAlt />,
      path: "/dashboard/schemes",
    },
    {
  title: "Disease Detection",
  icon: <FaMicroscope />,
  path: "/dashboard/disease-detection"
}
  ];

  return (
    <div className="w-[280px] bg-green-700 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        Agroman 🌾
      </h1>

      <div className="space-y-3">

        {menuItems.map((item, index) => (

          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-green-600 transition"
          >
            <div className="text-xl">
              {item.icon}
            </div>

            <p className="text-lg">
              {item.title}
            </p>

          </Link>

        ))}

      </div>
    </div>
  );
}

export default Sidebar;