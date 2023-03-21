import './Navbar.scss';
import Dropdown from '../../Dropdown';
import { AiOutlineDown } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { setUserOffline, setUserOnline } from '../../../store/actions/user';

const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);
  const dropdownButtonContent = (
    <span>
      Tvoj status <AiOutlineDown />
    </span>
  );
  const onOnline = () => {
    localStorage.setItem('online', true);
    dispatch(setUserOnline(currentUser));
    socket.emit('set-user-online', currentUser);
  };

  const onOffline = () => {
    localStorage.setItem('online', false);
    dispatch(setUserOffline(currentUser));
    socket.emit('set-user-offline', currentUser);
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
