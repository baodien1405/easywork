export const formatDate = (date: Date) => {
  if (!date) {
    return ''
  }

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}
