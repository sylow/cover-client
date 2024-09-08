interface FinalizeMessages {
  success: string
  error?: string[]
}

export function useNotify() {
  const notifyWithStatus = (status: Ref<string>, messages: FinalizeMessages) => {
    const toast = useToast() // Ensure toast is accessible

    if (status.value === 'success') {
      toast.add({
        title: 'Success',
        description: messages.success,
        color: 'green',
      })
    } else if (messages.error) {
      toast.add({
        title: 'Fail!!!',
        description: messages.error.join(', '),
        color: 'red',
      })
    }
  }

  return { notifyWithStatus }
}
