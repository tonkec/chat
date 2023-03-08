import Content from '../Content';
import Sidebar from '../Sidebar';

const Main = ({ children, component }) => {
  return (
    <div>
      <Sidebar />
      <Content component={component} />
    </div>
  );
};

export default Main;
