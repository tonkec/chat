import Content from '../Content'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
const Main = ({ component, options = {} }) => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <Content component={component} options={options} />
    </div>
  )
}

export default Main
