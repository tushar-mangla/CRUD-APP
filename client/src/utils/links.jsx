import { AiOutlineSetting } from "react-icons/ai"; // Import an icon from react-icons/ai
import { LuLayoutDashboard, LuGraduationCap } from "react-icons/lu"; // Import icons from react-icons/lu

// Define an array of links
const links = [
  {
    text: "dashboard", // Text for the link
    path: ".", // Path for the link (relative to the current location)
    icon: <LuLayoutDashboard />, // Icon for the link
  },
  {
    text: "allStudents", // Text for the link
    path: "allStudents", // Path for the link
    icon: <LuGraduationCap />,
  },
  {
    text: "setting", // Text for the link
    path: "setting", // Path for the link
    icon: <AiOutlineSetting />, // Icon for the link
  },
];

export default links; // Export the array of links
