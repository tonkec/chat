import Chat from '../../models/Chat';
import { Friend } from '../../models/Friend';
import Message from '../../models/Message';
import ChatService from '../../services/chatService';
export const FETCH_CHATS = 'FETCH_CHATS';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
export const FRIENDS_ONLINE = 'FRIENDS_ONLINE';
export const FRIEND_ONLINE = 'FRIEND_ONLINE';
export const FRIEND_OFFLINE = 'FRIEND_OFFLINE';
export const SET_SOCKET = 'SET_SOCKET';
export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';
export const SENDER_TYPING = 'SENDER_TYPING';
export const PAGINATE_MESSAGES = 'PAGINATE_MESSAGES';
export const INCREMENT_SCROLL = 'INCREMENT_SCROLL';
export const CREATE_CHAT = 'CREATE_CHAT';
export const ADD_USER_TO_GROUP = 'ADD_USER_TO_GROUP';
export const LEAVE_CURRENT_CHAT = 'LEAVE_CURRENT_CHAT';
export const DELETE_CURRENT_CHAT = 'DELETE_CURRENT_CHAT';



export const fetchChats = () => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  return ChatService.fetchChats()
    .then((data) => {
      data.forEach((chat: Chat) => {
        chat.users.forEach((user) => {
          user.status = 'offline';
        });
        chat.messages.reverse();
      });

      dispatch({ type: FETCH_CHATS, payload: data });
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const setCurrentChat = (chat: Chat) => (dispatch: (arg0: { type: string; payload: Chat; }) => void) => {
  dispatch({ type: SET_CURRENT_CHAT, payload: chat });
};

export const onlineFriends = (friends: Friend[]) => (dispatch: (arg0: { type: string; payload: Friend[]; }) => void) => {
  dispatch({ type: FRIENDS_ONLINE, payload: friends });
};
export const onlineFriend = (friend: Friend[]) => (dispatch: (arg0: { type: string; payload: Friend[]; }) => void) => {
  dispatch({ type: FRIEND_ONLINE, payload: friend });
};
export const offlineFriend = (friend: Friend[]) => (dispatch: (arg0: { type: string; payload: Friend[]; }) => void) => {
  dispatch({ type: FRIEND_OFFLINE, payload: friend });
};

export const setSocket = (socket: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({ type: SET_SOCKET, payload: socket });
};

export const receivedMessage = (message: Message, userId: number) => (dispatch: (arg0: { type: string; payload: { message: Message; userId: number; }; }) => void) => {
  dispatch({ type: RECEIVED_MESSAGE, payload: { message, userId } });
};

export const senderTyping = (sender: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({ type: SENDER_TYPING, payload: sender });
};

export const paginateMessages = (id: number, page: number) =>async  (dispatch: (arg0: { type: string; payload: { messages: any; id: number; pagination: any; }; }) => void) => {
  return ChatService.paginateMessages(id, page)
    .then(({ messages, pagination }) => {
      if (typeof messages !== 'undefined' && messages.length > 0) {
        messages.reverse();
        const payload = { messages, id, pagination };
        dispatch({ type: PAGINATE_MESSAGES, payload });
        return true;
      }

      return false;
    })
    .catch((err) => {
      throw err;
    });
};

export const incrementScroll = () => (dispatch: (arg0: { type: string; }) => void) => {
  dispatch({ type: INCREMENT_SCROLL });
};

export const createChat = (chat: Chat) => (dispatch: (arg0: { type: string; payload: Chat; }) => void) => {
  dispatch({ type: CREATE_CHAT, payload: chat });
};

export const addUserToGroup = (group: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({ type: ADD_USER_TO_GROUP, payload: group });
};

export const leaveCurrentChat = (data: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({ type: LEAVE_CURRENT_CHAT, payload: data });
};

export const deleteCurrentChat = (chatId: number) => (dispatch: (arg0: { type: string; payload: number; }) => void) => {
  dispatch({ type: DELETE_CURRENT_CHAT, payload: chatId });
};
