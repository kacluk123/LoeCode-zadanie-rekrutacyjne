import { ServerResponseUser } from './users.types'

const USER_BASE_API_NAME = 'users'
export const BASE_USERS_URL = `${process.env.REACT_APP_API_URL}/${USER_BASE_API_NAME}`

export const getUsers = async () => {
  const response = await fetch(BASE_USERS_URL);
  const users: ServerResponseUser[] = await response.json();
  return users;
}