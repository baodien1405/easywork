import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './stack'

export type AddEditTaskScreenProps = NativeStackScreenProps<RootStackParamList, 'AddEditTaskScreen'>
export interface Task {
  title: string
  description: string
  dueDate: Date
  start: Date
  end: Date
  uids: string[]
  fileList?: any
  fileUrls?: string[]
}
