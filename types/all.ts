// Define the structure of the user data object
export interface UserData {
  token: string
  exp: string
  email: string
}

// Define the structure of the authentication data stored in local storage
export interface AuthData {
  token: string
  exp: string
  email: string
}

export interface Message {
  type: string
  content: string
}

export interface Resume {
  id: number
  title: string
  content: string
  created_at?: string
}

export interface Login {
  email: string
  password: string
}

export interface Cover {
  cover: string
  resume_id?: number
  resume?: string
}