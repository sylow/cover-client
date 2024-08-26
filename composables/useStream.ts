import { type Message } from '~/types/auth'

export function useStream<T> (callback: composableFunction<T>) {
  const config = useRuntimeConfig()
  const { token, isAuthenticated } = useAuth()
  const toast = useToast()
  const closeMethod = ref<Function>()

  const eventReceived = (message: Message) => {
    if (message == undefined) return

    toast.add({title: 'New Message', description: message.content})
  }

  const connect = () => {
    // if not authenticated, close the connection
    if (!isAuthenticated.value) {
      closeMethod.value?.()
      return
    }

    const { send, ws, close } = useWebSocket(<string>`${config.public.baseWs}?token=${token.value}`, {
      onConnected: (_) =>{
        closeMethod.value = close
        const subscriptionMsg = {
          command: 'subscribe',
          identifier: JSON.stringify({
            channel: 'ConversationChannel'
          })
        }
        send(JSON.stringify(subscriptionMsg))
      },

      onMessage: (_, event) => {
        const message = JSON.parse(event.data)
        if (message.type == 'ping')
          return;
        eventReceived(message?.message)
      }
    })
  }

  watch( () => token,
         () => { connect() },
         { immediate: true })

}