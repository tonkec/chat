import Main from './../../components/Layout/Main';
import Message from '../../components/Message';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchChats } from '../../store/actions/chat';
const MessagesPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [chat, setChat] = useState([]);

  const getAllChats = useCallback(async () => {
    const allChats = await dispatch(fetchChats());
    const filteredChat = allChats.filter(
      (chatFromAllChats) => parseInt(id) === chatFromAllChats.id
    );
    setChat(filteredChat[0]);
  }, [dispatch, id]);

  useEffect(() => {
    getAllChats();
  }, [getAllChats]);
  return <Main component={Message} options={{ chatId: id, chat: chat }} />;
};

export default MessagesPage;
