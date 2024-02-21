export const formatDate = (date: Date) => {
  if (!date) return ''
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const replaceSpecialCharacter = (str: string) => {
  return str
    .normalize('NFD')
    .toLocaleLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/ /g, '-')
    .replace(/[:!@#$%^&*()?;/]/g, '')
}
