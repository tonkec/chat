import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../store/actions/auth";
import axios from "axios";

const Chat = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logout());
  };

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const result = await axios(
        "https://hn.algolia.com/api/v1/search?query=redux"
      );
      setData(result);
    };

    fetchingData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <h1>Chat</h1>
      {user.email} <img src={user.avatar} alt="kitten" />
      <button onClick={onClick}>Log out</button>
    </>
  );
};

export default Chat;
