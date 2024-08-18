import { defu } from 'defu'

export function useStream<T> (callback: Function) {
  const config = useRuntimeConfig()

  const { status, data, send, open, close, ws } = useWebSocket(<string>config.public.baseWs, {
    onConnected: (ws) =>{
      const subscriptionMsg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          id: 1,
          channel: 'ConversationChannel'
        })
      }
      send(JSON.stringify(subscriptionMsg))
    },
    onMessage: (ws, event) => {
      const message = JSON.parse(event.data)
      if (message.type == 'ping')
        return;
      callback(message)
    }
  })

  return true
}