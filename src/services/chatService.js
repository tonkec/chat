import API from './api';

const ChatService = {
  fetchChats: () => {
    return API.get('/chats')
      .then(res => res.data)
      .catch(e => {
        throw e;
      });
  },
  uploadImage: data => {
    const headers = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
    return API.post('/chats/upload-image', data, headers)
      .then(res => res.data.url)
      .catch(e => {
        throw e;
      });
  },
  paginateMessages: (id, page) => {
    return API.get('/chats/messages', {
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
  searchUsers: term => {
    return API.get('/users/search-users', {
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
  createChat: partnerId => {
    return API.post('/chats/create', { partnerId })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

  leaveCurrentChat: chatId => {
    return API.post('/chats/leave-current-chat', { chatId })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

  addFriendToGroupChat: (userId, chatId) => {
    return API.post('/chats/add-user-to-group', { userId, chatId })
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
