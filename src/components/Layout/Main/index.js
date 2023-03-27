import Content from '../Content';
import Sidebar from '../Sidebar';

const Main = ({ component, options = {} }) => {
  return (
    <div>
      <Sidebar />
      <Content component={component} options={options} />
    </div>
  );
};

export default Main;
