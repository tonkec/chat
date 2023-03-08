import Content from '../Content';
import Sidebar from '../Sidebar';

const Main = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <Content content={children} />
    </div>
  );
};

export default Main;
