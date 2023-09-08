import './Content.scss';
const Content = ({ component: Component, options }) => {
  return (
    <main className='content'>
      <Component options={options} />
    </main>
  );
};

export default Content;
