// Define the structure of the user data object
import {type NuxtError } from '#app'

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
  resume: string
  created_at?: string
}

export interface Login {
  email: string
  password: string
}

export interface Cover {
  cover?: string
  project: string
  resume_id?: number | null | undefined
  options: {
    formality: 'formal' | 'informal'
    words: number
    perspective: '1st person' | '3rd person'
  }
}

export interface ApiError extends NuxtError {
  data?: {
    error?: string
  }
}

export type CallResult = {
  data?: Ref<AuthData | null>
  error?: Ref<NuxtError | null>
};
