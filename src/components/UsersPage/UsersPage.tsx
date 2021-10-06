import * as React from 'react'

import { UsersList } from './UsersList'
import { api } from '../../api'
import { ServerResponseUser } from '../../api/users/users.types'
import { useRequestStatus, RequestStatuses } from '../../hooks/requestStatus'

import './UsersPage.css'

export const UsersPage: React.FC = () => {
  const [ users, setUsers ] = React.useState<ServerResponseUser[]>([])
  const [ searchValue, setSearch ] = React.useState("")
  const { requestStatus, setRequestStatus } = useRequestStatus(RequestStatuses.Pending)

  React.useEffect(() => {
    (async () => {
      try {
        const response = await api.users.getUsers()
        setUsers(response)
        setRequestStatus(RequestStatuses.Done)
      } catch {
        setRequestStatus(RequestStatuses.Error)
      } 
    })()
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    setSearch(value)
  }

  const list = React.useMemo(() => (users.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()))), [searchValue, users])

  return (
    <div className='UsersPage'>
      <h1 className='UsersPage__header'>
        Users list
      </h1>
      <div className='UsersPage__main-container'>
        <input 
          name='usersPageSearchInput' 
          placeholder='Search by user name...' 
          className='UsersPage__search-input' 
          onChange={handleSearch} 
          data-testid='users-search-input'
        />
        <UsersList users={list} requestStatus={requestStatus} />
      </div>
    </div>
  )
} 
