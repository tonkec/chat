import API from "./api";

const ChatService = {
  fetchChats: () => {
    return API.get("/chats")
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  },
};

export default ChatService;
