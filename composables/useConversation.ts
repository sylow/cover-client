import { type Message } from '~/types/auth'

export function useConversation() {
  const toast = useToast()

  const execute = (message: Message) => {
    if (message == undefined) return

    toast.add({title: 'New Message', description: message.content})
  }
  return { execute }
}
