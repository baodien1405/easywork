import * as yup from 'yup'

export const useTaskSchema = () => {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter a title'),
    description: yup.string().required('Please enter a description'),
    dueDate: yup.date().required('Please select a date'),
    start: yup.date().required('Please select a date'),
    end: yup.date().required('Please select a date'),
    members: yup.array().notRequired().of(yup.string()).min(1, 'Please select at least one')
  })

  return schema
}
