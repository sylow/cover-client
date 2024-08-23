import { type Message } from '~/types/auth'

export function useStream<T> (callback: composableFunction<T>) {
  const config = useRuntimeConfig()
  const { token, isAuthenticated } = useAuth()
  const toast = useToast()
  const closeMethod = ref<Function>()

  onMounted(() => {
    connect()
  })

  watch(token, () => {
    connect()
  })

  const eventReceived = (message: Message) => {
    if (message == undefined) return

    toast.add({title: 'New Message', description: message.content})
  }

  const connect = () => {
    console.log('connect')
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

  return { connect }
}