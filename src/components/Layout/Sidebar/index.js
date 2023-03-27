import Links from './Links';
import Logo from './Logo';
import './Sidebar.scss';
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Logo />
      <Links />
    </aside>
  );
};

export default Sidebar;
