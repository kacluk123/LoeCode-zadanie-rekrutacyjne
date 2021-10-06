import React from 'react';
import { render, screen } from '@testing-library/react';
import { UsersList } from './UsersList';
import { RequestStatuses } from '../../../hooks/requestStatus';
import { users } from '../../../testUtils/mock/user'

describe('Users list test', () => {
  test('Should display all list elements', () => {
    const { getAllByTestId } = render(<UsersList requestStatus={RequestStatuses.Done} users={users} />);
    expect(getAllByTestId('user-list-element').length).toBe(10)
  });

  test('Should display information about no elements', () => {
    const { getByText } = render(<UsersList requestStatus={RequestStatuses.Done} users={[]} />);
    expect(getByText('No users...')).toBeInTheDocument()
  });

  test('Should display information about list loading', () => {
    const { getByText } = render(<UsersList requestStatus={RequestStatuses.Pending} users={[]} />);
    expect(getByText('Loading...')).toBeInTheDocument()
  });

  test('Should display information about error', () => {
    const { getByText } = render(<UsersList requestStatus={RequestStatuses.Error} users={[]} />);
    expect(getByText('An error occured. Please try again later.')).toBeInTheDocument()
  });
})