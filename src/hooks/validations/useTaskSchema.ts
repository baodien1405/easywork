import * as yup from 'yup'

export const useTaskSchema = () => {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter a title'),
    description: yup.string().required('Please enter a description'),
    dueDate: yup.date().required('Please select a date')
  })

  return schema
}
