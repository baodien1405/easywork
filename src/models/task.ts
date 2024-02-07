import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './stack'

export type AddEditTaskScreenProps = NativeStackScreenProps<RootStackParamList, 'AddEditTaskScreen'>

export type TaskDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskDetailsScreen'>

interface Attachment {
  name: string
  size: number
  url: string
}

export interface Task {
  id?: string
  title: string
  description: string
  dueDate: Date
  start: Date
  end: Date
  uids: string[]
  fileList?: any
  attachments?: Attachment[]
  progress?: number
}
