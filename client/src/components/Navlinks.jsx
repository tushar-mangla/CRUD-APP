// import { useDashboardContext } from "../pages/Dashboard";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isBigSidebar }) => {
  // const { toggleSidebar } = useDashboardContext();

  return (
    <div>dsdasd</div>
    // <div className="nav-links">
    //   {links.map((link) => {
    //     const { text, path, icon } = link;
    //     return (
    //       <NavLink
    //         to={path}
    //         key={text}
    //         onClick={isBigSidebar ? null : toggleSidebar}
    //         className="nav-link"
    //         end
    //       >
    //         <span className="icon">{icon}</span>
    //         {text}
    //       </NavLink>
    //     );
    //   })}
    // </div>
  );
};

export default NavLinks;
