import { defu } from 'defu'

export function useStream<T> (callback: composableFunction<T>) {
  const config = useRuntimeConfig()
  const token = useAuth().token.value

  const { send, ws } = useWebSocket(<string>`${config.public.baseWs}?token=${token}`, {
    onConnected: (_) =>{
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
      callback.execute(message?.message)
    }
  })

  return true
}