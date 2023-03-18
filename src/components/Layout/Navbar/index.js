import './Navbar.scss';
import Dropdown from '../../Dropdown';
import { AiOutlineDown } from 'react-icons/ai';

const Navbar = () => {
  const dropdownButtonContent = (
    <span>
      Tvoj status <AiOutlineDown />
    </span>
  );
  const onOnline = () => {
    console.log('gone online');
  };

  const onOffline = () => {
    console.log('gone offline');
  };
  const items = [
    { displayText: 'budi online', actionOnClick: onOnline },
    { displayText: 'budi offline', actionOnClick: onOffline },
  ];
  return (
    <nav className="navbar">
      <Dropdown items={items} buttonContent={dropdownButtonContent} />
    </nav>
  );
};

export default Navbar;
