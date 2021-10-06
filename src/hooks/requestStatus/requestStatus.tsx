import * as React from 'react'

export enum RequestStatuses {
  Initial = 'initial',
  Pending = 'pending',
  Done = 'done',
  Error = 'error'
}

export const useRequestStatus = (initial?: RequestStatuses) => {
  const [ requestStatus, setRequestStatus ] = React.useState<RequestStatuses>(initial || RequestStatuses.Initial)
  return { requestStatus, setRequestStatus }
}