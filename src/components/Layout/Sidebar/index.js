import Links from "./Links";
import Logo from "./Logo";
import "./Sidebar.scss";

import { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { TfiAlignJustify } from "react-icons/tfi";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  function showLinks(e) {
    setOpenSidebar(!openSidebar);
  }

  return (
    <div>
      <aside className={`sidebar  ${openSidebar && "active"}`}>
        <Logo />
        <div className="hamburger-icons" onClick={showLinks}>
          {openSidebar ? (
            <TfiClose className="x-icon active" />
          ) : (
            <TfiAlignJustify className="hamburger-icon active" />
          )}
        </div>
        <div className={`nav-links  ${openSidebar && "active"}`}>
          <Links />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
