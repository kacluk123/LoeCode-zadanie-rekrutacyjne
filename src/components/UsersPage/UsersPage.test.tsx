import React from 'react'
import '@testing-library/jest-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react'

import { UsersPage } from './UsersPage'
import { render } from '@testing-library/react'
import { BASE_USERS_URL } from '../../api/users/users'
import { users } from '../../testUtils/mock/user'

const server = setupServer(
  rest.get(BASE_USERS_URL, (req, res, ctx) => {
    return res(ctx.json(users))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Users list text', () => {
  test('Should display initial element from api request', async () => {
    const { getAllByTestId, queryByText , getByText } = render(<UsersPage />);
    expect(getByText('Loading...')).toBeInTheDocument()
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    expect(getAllByTestId('user-list-element').length).toBe(10)
  });

  test('Should search input works', async () => {
    const { getByTestId, queryAllByTestId, queryByText } = render(<UsersPage />);
    const userSearchInput = getByTestId('users-search-input')
    await waitForElementToBeRemoved(() => queryByText('Loading...'))

    fireEvent.change(userSearchInput, {target: {value: 'le'}})
    expect(queryAllByTestId('user-list-element').length).toBe(5)

    fireEvent.change(userSearchInput, {target: {value: 'leanne'}})
    expect(queryAllByTestId('user-list-element').length).toBe(1)

    fireEvent.change(userSearchInput, {target: {value: 'random-random-123456'}})
    expect(queryAllByTestId('user-list-element').length).toBe(0)
  });
})