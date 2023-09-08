import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ChatHeader from '../ChatHeader/'
import MessageBox from '../MessageBox/'
import MessageInput from '../MessageInput'
import useSocket from '../../../hooks/socketConnect'
import './Messenger.scss'

const Messenger = ({ chat: chatFromProps }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)
  useSocket(dispatch, user)
  const chatFromState = useSelector(state => {
    return state.chatReducer.currentChat
  })

  const activeChat = () => {
    if (chatFromState) {
      return Object.keys(chatFromState).length > 0
    }

    if (chatFromProps) {
      return Object.keys(chatFromProps).length > 0
    }
  }

  const chat = chatFromState || chatFromProps
  return (
    <div className='messenger'>
      {activeChat() && (
        <div>
          <ChatHeader chat={chat} />
          <MessageBox chat={chat} />
          <MessageInput chat={chat} />
        </div>
      )}
    </div>
  )
}

export default Messenger
