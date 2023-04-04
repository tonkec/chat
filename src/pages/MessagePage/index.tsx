import React from "react";
import Main from "../../components/Layout/Main";
import Message from "../../components/Message";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchChats } from "../../store/actions/chat";
const MessagesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  
  const getAllChats = useCallback(async () => {
    const allChats = dispatch(fetchChats());
    const filteredChat = allChats.filter(
      (chatFromAllChats: { id: number; }) => parseInt(id!) === chatFromAllChats.id
    );

    if (filteredChat.length > 0) {
      setChat(filteredChat[0]);
    } else {
      navigate("/");
    }
  }, [dispatch, id, navigate]);
  useEffect(() => {
    getAllChats();
  }, [getAllChats]);
  return (
    <>
      {chat !== null && (
        <Main component={Message} options={{ chatId: id, chat: chat }} />
      )}
    </>
  );
};

export default MessagesPage;
 