import API from "./api";

const ChatService = {
  fetchChats: () => {
    return API.get("/chats")
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  },
  uploadImage: (data) => {
    const headers = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    return API.post("/chats/upload-image", data, headers)
      .then((res) => res.data.url)
      .catch((e) => {
        throw e;
      });
  },
};

export default ChatService;
