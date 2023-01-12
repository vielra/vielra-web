// import { API_BASE_URL } from '@/features/app/constants'
import { api } from '@/utils/api'
import * as Yup from 'yup'

const checkAvailabilityUsername = async (username: string): Promise<boolean> => {
  console.log('----username', username)
  return new Promise((resolve, reject) => {
    api
      .get(`/check-availability-username/${username}`)
      .then((res) => {
        if (res.data.availability) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch((_) => {
        resolve(false)
      })
  })
}

const signUpValidation = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(200, 'Name must be less  than 20 characters'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less  than 20 characters')
    .required('Username is required')
    .test('Unique Username', 'Username already in use', function (value) {
      if (value) {
        return checkAvailabilityUsername(value as string)
      }
      return false
    }),
  email: Yup.string().required('Email is required').email(),
  password: Yup.string().required('Please input password.'),
  password_confirmation: Yup.string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
})

const signInValidation = Yup.object().shape({
  email: Yup.string().required('Username or email is required'),
  password: Yup.string().required('Please input password.'),
})

const resetPasswordValidation = Yup.object().shape({
  email: Yup.string().email('Please input a valid email associated with your account').required('Email is required'),
})

export { signUpValidation, signInValidation, resetPasswordValidation }
