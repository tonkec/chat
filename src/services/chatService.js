import API from "./api";

const ChatService = {
  fetchChats: () => {
<<<<<<< HEAD
    return API.get("/chats")
      .then((res) => res.data)
      .catch((e) => {
=======
    return API.get('/chats')
      .then(res => res.data)
      .catch(e => {
>>>>>>> master
        throw e;
      });
  },
  uploadImage: data => {
    const headers = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
<<<<<<< HEAD
    return API.post("/chats/upload-image", data, headers)
      .then((res) => res.data.url)
      .catch((e) => {
=======
    return API.post('/chats/upload-image', data, headers)
      .then(res => res.data.url)
      .catch(e => {
>>>>>>> master
        throw e;
      });
  },
  paginateMessages: (id, page) => {
    return API.get("/chats/messages", {
      params: {
        id,
        page,
      },
    })
      .then(res => res.data)
      .catch(e => {
        throw e;
      });
  },
<<<<<<< HEAD
  searchUsers: (term) => {
    return API.get("/users/search-users", {
=======
  searchUsers: term => {
    return API.get('/users/search-users', {
>>>>>>> master
      params: {
        term,
      },
    })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },
<<<<<<< HEAD
  createChat: (partnerId) => {
    return API.post("/chats/create", { partnerId })
=======
  createChat: partnerId => {
    return API.post('/chats/create', { partnerId })
>>>>>>> master
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

<<<<<<< HEAD
  leaveCurrentChat: (chatId) => {
    return API.post("/chats/leave-current-chat", { chatId })
=======
  leaveCurrentChat: chatId => {
    return API.post('/chats/leave-current-chat', { chatId })
>>>>>>> master
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

  addFriendToGroupChat: (userId, chatId) => {
    return API.post("/chats/add-user-to-group", { userId, chatId })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },
  deleteCurrentChat: chatId => {
    return API.delete(`/chats/${chatId}`)
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },
};

export default ChatService;
