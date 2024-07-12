import Content from '../Content';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
const Main = ({ component, options = {} }) => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Content component={component} options={options} />
    </>
  );
};

export default Main;
