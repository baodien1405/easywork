import * as yup from 'yup'

export const useSignUpSchema = () => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter a username or email')
      .email('Please enter a valid email')
      .matches(emailRegex, { message: 'Please enter a valid email' })
      .trim('Please enter a suffix with no leading or trailing spaces'),
    password: yup
      .string()
      .required('Please enter a password')
      .trim('Please enter a suffix with no leading or trailing spaces')
      .min(6, 'Password is required to have at least 6 characters'),
    fullName: yup
      .string()
      .required('Please enter a password')
      .trim('Please enter a suffix with no leading or trailing spaces')
  })
  return schema
}
