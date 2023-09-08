import { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import './Dropdown.scss'

const Dropdown = ({ onOfflineClick, onOnlineClick }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isOnline, setIsOnline] = useState(
    JSON.parse(localStorage.getItem('online') || false),
  )

  return (
    <div className='dropdown'>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        <span>
          Tvoj status <AiOutlineDown />
        </span>
      </button>
      {showDropdown && (
        <ul className='dropdown-list'>
          {isOnline ? (
            <li
              className='dropdown-list-item'
              onClick={() => {
                onOfflineClick()
                setIsOnline(!isOnline)
              }}
            >
              Budi offline
            </li>
          ) : (
            <li
              className='dropdown-list-item'
              onClick={() => {
                onOnlineClick()
                setIsOnline(!isOnline)
              }}
            >
              Budi online
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
