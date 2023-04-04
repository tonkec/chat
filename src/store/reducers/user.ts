import { SET_ONLINE_USERS, SET_USER_OFFLINE, SET_USER_ONLINE } from '../types';
import User from '../../models/User';

interface InitialState {
  onlineUsers: User[]
}

export const initialState: InitialState = {
  onlineUsers: [],
};

export const userReducer = (state = initialState, action: { type: any; payload: any; }) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ONLINE_USERS: {
      return {
        ...state,
        onlineUsers: payload,
      };
    }

    case SET_USER_OFFLINE: {
      return {
        ...state,
        onlineUsers: state.onlineUsers.filter(
          (onlineUser) => onlineUser.user.id !== payload.id
        ),
      };
    }

    case SET_USER_ONLINE: {
      if (state.onlineUsers.length === 0) {
        return {
          ...state,
          onlineUsers: state.onlineUsers.push(payload),
        };
      } else {
        return {
          ...state,
          onlineUsers: state.onlineUsers.map((onlineUser) => {
            if (onlineUser.user.id !== payload.id) {
              state.onlineUsers.push({
                user: payload,
                id: 0,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                gender: '',
                isVerified: false,
                avatar: '',
                status: ''
              });
            }

            return onlineUser;
          }),
        };
      }
    }

    default:
      return state;
  }
};

export default userReducer;
