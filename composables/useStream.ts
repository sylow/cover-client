import { type Message } from '~/types/all'

export function useStream<T> (callback: composableFunction<T>) {
  const config = useRuntimeConfig()
  const { token, isAuthenticated } = useAuth()
  const coverStore = useCoverStore()
  const toast = useToast()
  const closeMethod = ref<Function>()
  const eventReceived = (message: Message) => {
    if (message == undefined) return

    toast.add({ title: 'New Message', description: message.content })
    if (message.type == 'covers.update_all') {
      coverStore.fetch(true)
      useUserStore().fetch(true)  // so credits are updated
    }
    if (message.type == 'user.update') {
      useUserStore().fetch(true)
    }
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