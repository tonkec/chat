import API from './api';

const ChatService = {
  fetchChats: () => {
    return API.get('/chats')
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  },
  uploadImage: (data: any) => {
    const headers = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
    return API.post('/chats/upload-image', data, headers)
      .then((res) => res.data.url)
      .catch((e) => {
        throw e;
      });
  },
  paginateMessages: (id: any, page: any) => {
    return API.get('/chats/messages', {
      params: {
        id,
        page,
      },
    })
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  },
  searchUsers: (term: any) => {
    return API.get('/users/search-users', {
      params: {
        term,
      },
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  createChat: (partnerId: number) => {
    return API.post('/chats/create', { partnerId })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  leaveCurrentChat: (chatId: number) => {
    return API.post('/chats/leave-current-chat', { chatId })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  addFriendToGroupChat: (userId: number, chatId: number) => {
    return API.post('/chats/add-user-to-group', { userId, chatId })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  deleteCurrentChat: (chatId: number) => {
    return API.delete(`/chats/${chatId}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default ChatService;
