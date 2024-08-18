export function useConversation() {
  const execute = (message: object) => {
    if (message == undefined) return
    console.log('message')
    console.log(message)
  }
  return { execute }
}
