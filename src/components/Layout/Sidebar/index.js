import Links from "./Links";
import Logo from "./Logo";
import "./Sidebar.scss";
import Hamburger from "./Hamburger/Hamburger";
import { useState } from "react";
const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  function showLinks(e) {
    setOpenSidebar(!openSidebar);
  }

  return (
    <aside className="sidebar">
      <Logo />
      <div onClick={showLinks}>
        {openSidebar ? <h2 className="x-button"> X</h2> : <Hamburger />}
      </div>

      <div className={`nav-links  ${openSidebar && "active"}`}>
        <Links />
      </div>
    </aside>
  );
};

export default Sidebar;
