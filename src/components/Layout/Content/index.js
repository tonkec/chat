import './Content.scss';
const Content = ({ component: Component }) => {
  return (
    <main className="content">
      <Component />
    </main>
  );
};

export default Content;
