import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { incrementScroll } from '../../../store/actions/chat'
import { AiFillBell } from 'react-icons/ai'
import './MessageInput.scss'
const MessageInput = ({ chat }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)
  const socket = useSelector(state => state.chatReducer.socket)
  const newMessage = useSelector(state => state.chatReducer.newMessage)

  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showNewMessageNotification, setShowNewMessageNotification] =
    useState(false)

  const msgInput = useRef()
  const handleMessage = e => {
    const value = e.target.value
    setMessage(value)
    const receiver = {
      chatId: chat.id,
      fromUser: user,
      toUserId: chat.Users.map(user => user.id),
    }

    if (value.length === 1) {
      receiver.typing = true
      socket.emit('typing', receiver)
    }

    if (value.length === 0) {
      receiver.typing = false
      socket.emit('typing', receiver)
    }
  }

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === 'Enter') {
      sendMessage(imageUpload)
    }
  }

  const sendMessage = imageUpload => {
    if (message.length < 1 && !imageUpload) {
      return
    }

    const msg = {
      type: imageUpload ? 'image' : 'text',
      fromUser: user,
      toUserId: chat.Users && chat.Users.map(user => user.id),
      chatId: chat.id,
      message: imageUpload ? imageUpload : message,
    }

    setMessage('')
    setShowEmojiPicker(false)
    socket.emit('message', msg)
  }

  const selectEmoji = emoji => {
    const startPosition = msgInput.current.selectionStart
    const endPosition = msgInput.current.selectionEnd
    const emojiLength = emoji.native.length
    const value = msgInput.current.value
    setMessage(
      value.substring(0, startPosition) +
        emoji.native +
        value.substring(endPosition, value.length),
    )
    msgInput.current.focus()
    msgInput.current.selectionEnd = endPosition + emojiLength
  }

  useEffect(() => {
    const isSeen = newMessage.seen
    const isCurrentChat = newMessage.chatId === chat.id
    const documentHeight =
      document.documentElement.scrollHeight !==
      document.documentElement.clientHeight

    const isScrolled = () => {
      console.log(document.documentElement.scrollTop, 'scrollt top')
      console.log(document.documentElement.scrollHeight, 'height')
      return (
        document.documentElement.scrollTop >
        document.documentElement.scrollHeight
      )
    }
    const shouldScroll = !isSeen && isCurrentChat && documentHeight
    if (shouldScroll) {
      if (isScrolled()) {
        // dispatch(incrementScroll());
      } else {
        setShowNewMessageNotification(true)
      }
    } else {
      setShowNewMessageNotification(false)
    }
  }, [newMessage, dispatch, chat.id])

  const showNewMessage = () => {
    dispatch(incrementScroll())
    setShowNewMessageNotification(false)
  }
  return (
    <div className='input-container'>
      <div className='message-input'>
        <div className='image-upload-container'>
          <div>
            {showNewMessageNotification ? (
              <div className='message-notification' onClick={showNewMessage}>
                <AiFillBell />
              </div>
            ) : null}
          </div>
        </div>
        <input
          type='text'
          placeholder='Stisni enter da pošalješ poruku...'
          onChange={e => handleMessage(e)}
          onKeyDown={e => handleKeyDown(e, false)}
          value={message}
          ref={msgInput}
        />
        <button
          className='button-inline-block button-emoji'
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          🙂
        </button>
      </div>

      {showEmojiPicker ? (
        <Picker
          data={data}
          title='Pick your emoji...'
          emoji='point_up'
          style={{ position: 'absolute', bottom: '20px', right: '0px' }}
          onEmojiSelect={selectEmoji}
        />
      ) : null}
    </div>
  )
}

export default MessageInput
