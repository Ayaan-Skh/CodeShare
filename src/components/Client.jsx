import React from 'react'
import Avatar from 'react-avatar'

const Client = ({username}) => {
  return (
    <div>
      <Avatar name={username} size='50px' round='10px'/>
      <span className='pl-3 font-medium text-white'>{username}</span>
    </div>
  )
}

export default Client
