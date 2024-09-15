import type { Transaction } from '~/types/all'

export function useTransactionApi() {
  const { $api }  = useNuxtApp()


  const fetch = () => {
    return useAsyncData<Transaction[]>('transactions', () => $api('/api/v1/transactions') )
    // return { data, error }
  }

  return { fetch }
}

