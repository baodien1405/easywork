import { DocumentPickerResponse } from 'react-native-document-picker'
import storage from '@react-native-firebase/storage'

export const handleUploadFileToStorage = async (item: DocumentPickerResponse) => {
  const filename = item.name || `file${Date.now()}`
  const path = `documents/${filename}`

  await storage().ref(path).putFile(item.uri)

  const attachment = {
    name: filename,
    size: item.size || 0,
    url: await storage().ref(path).getDownloadURL()
  }

  return attachment
}

export const convertFileSizeToMB = (fileSize: number) => {
  const MB_TO_BYTES = 1024 * 1024

  return fileSize / MB_TO_BYTES
}
