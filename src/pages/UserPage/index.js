import User from '../../components/User';
import Main from '../../components/Layout/Main';
const UserPage = (props) => {
  console.log(props);
  return <Main component={User} />;
};

export default UserPage;
