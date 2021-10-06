import * as React from 'react'

import { ServerResponseUser } from '../../../api/users/users.types'
import { RequestStatuses } from '../../../hooks/requestStatus'

import './UsersList.css'

interface IUsersList {
  users: ServerResponseUser[]
  requestStatus: RequestStatuses
}

export const UsersList: React.FC<IUsersList> = ({ users, requestStatus }) => {
  if (requestStatus === RequestStatuses.Pending) {
    return (
      <div className='UsersList__container UsersList__element-main-text'>
        Loading...
      </div>
    )
  } else if (requestStatus === RequestStatuses.Error) {
    return (
      <div className='UsersList__container UsersList__element-main-text'>
        An error occured. Please try again later.
      </div>
    )
  } else if (users.length === 0) {
    return (
      <div className='UsersList__container UsersList__element-main-text'>
        No users...
      </div>
    )
  } else {
    return (
      <ul className='UsersList UsersList__container'>
        {users.map((user, index) => (
          <li key={user.id} className='UsersList__element' data-testid='user-list-element'>
            <span className='UsersList__element-addon-text'>
              {index + 1}.
            </span>
            <span className='UsersList__element-main-text'>
              {user.name}
            </span>
            <span className='UsersList__element-addon-text UsersList__element-username'>
              @{user.username}
            </span>
          </li>
        ))}
      </ul>
    )
  }
} 
