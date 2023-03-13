import Main from './../../components/Layout/Main';
import Message from '../../components/Message';
import { useParams } from 'react-router-dom';
const MessagesPage = () => {
  const { id } = useParams();
  return <Main component={Message} options={{ chatId: id }} />;
};

export default MessagesPage;
