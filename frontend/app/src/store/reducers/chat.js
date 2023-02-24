import { FETCH_CHATS } from "../actions/chat";
const initilState = {
  chats: [],
  currentChat: {},
};

const chatReducer = (state = initilState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CHATS:
      return {
        ...state,
        chats: payload,
      };
    default: {
      return state;
    }
  }
};

export default chatReducer;
