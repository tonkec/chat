import Links from "./Links";
import Logo from "./Logo";
import "./Sidebar.scss";
import Hamburger from "./Hamburger/Hamburger";
import { useState } from "react";
const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [viewBurger, setViewBurger] = useState(true);
  function showLinks(e) {
    setOpenSidebar(!openSidebar);
    setViewBurger(!viewBurger);
  }

  return (
    <aside className="sidebar">
      <Logo />
      <div onClick={showLinks}>
        <Hamburger />
      </div>

      <div className={`nav-links  ${openSidebar && "active"}`}>
        <Links />
      </div>
    </aside>
  );
};

export default Sidebar;
