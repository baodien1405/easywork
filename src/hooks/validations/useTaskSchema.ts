import { Task } from '@/models'
import * as yup from 'yup'

interface UseTaskSchemaProps {
  initialValues?: Task
}

export const useTaskSchema = ({ initialValues }: UseTaskSchemaProps) => {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter a title'),
    description: yup.string().required('Please enter a description'),
    dueDate: yup.date().required('Please select a date'),
    start: yup.date().required('Please select a date'),
    end: yup.date().required('Please select a date'),
    uids: yup
      .array()
      .of(yup.string().required())
      .min(1, 'Please select at least one')
      .required('Please select members'),
    fileList: yup
      .mixed()
      .nullable()
      .test('test-required', 'Please select a file', (value: any) => {
        if (Boolean(initialValues?.id) || Boolean(value)) return true
        return false
      })
      .test('test-size', 'Maximum file exceeded. Please select another file', (value: any) => {
        const fileSize =
          value?.reduce((size: number, currentFile: File) => {
            return size + currentFile.size
          }, 0) || 0
        const MB_TO_BYTES = 1024 * 1024
        const MAX_SIZE = 10 * MB_TO_BYTES // 10MB

        return fileSize <= MAX_SIZE
      })
  })

  return schema
}
