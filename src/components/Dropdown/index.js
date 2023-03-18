import { useState } from 'react';

import './Dropdown.scss';
const Dropdown = ({ items, buttonContent }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="dropdown">
      <button onClick={() => setShowDropdown(!showDropdown)}>
        {buttonContent}
      </button>
      {showDropdown && (
        <ul className="dropdown-list">
          {items &&
            items.map((item, i) => (
              <li onClick={item.actionOnClick} key={i}>
                {item.displayText}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
