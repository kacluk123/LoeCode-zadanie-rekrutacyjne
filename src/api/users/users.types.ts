export interface ServerResponseUser {
  id: number
  name: string
  username: string
  email: string
  address: ServerResponseAddress
  phone: string
  website: string
  company: ServerResponseCompany
}

export interface ServerResponseAddress {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}

export interface ServerResponseCompany {
  name: string
  catchPhrase: string
  bs: string
}