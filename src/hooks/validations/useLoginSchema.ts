import * as yup from 'yup'

export const useLoginSchema = () => {
  const emailRegex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter an email')
      .email('Please enter a valid email')
      .matches(emailRegex, { message: 'Please enter a valid email' })
      .trim('Please enter a suffix with no leading or trailing spaces'),
    password: yup
      .string()
      .required('Please enter a password')
      .trim('Please enter a suffix with no leading or trailing spaces')
      .min(6, 'Password is required to have at least 6 characters')
  })
  return schema
}
