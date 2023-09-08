import Messenger from '../Chat/Messenger'
import { useDispatch } from 'react-redux'
import { setCurrentChat } from '../../store/actions/chat'
import { useEffect } from 'react'
const Message = ({ options }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentChat(options.chat))
  })
  return (
    <>
      <Messenger chat={options.chat} />
    </>
  )
}

export default Message
