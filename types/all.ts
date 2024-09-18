// Define the structure of the user data object
import {type NuxtError } from '#app'

export interface User {
  email: string
  credits: number
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
  resume: string
  created_at?: string
}

export interface Login {
  email: string
  password: string
}

export interface CoverForm {
  job_description: string
  resume_id: number | null | undefined
  options: {
    formality: 'formal' | 'informal'
    words: number
    perspective: '1st person' | '3rd person'
  }
}

export interface CoverApi extends CoverForm {
  id: number
  cover: string
  resume_title: string
  resume_content: string
  aasm_state: string
}

// Define valid keys for the translations
export type CoverState = 'created' | 'running' | 'completed' | 'failed';
export interface Translation {
  label: string;
  class: string;
  disabled: boolean;
}


export interface Transaction {
  id: number
  amount: number
  transaction_type: string
  description: string
  created_at: string
  transactionable: object
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
