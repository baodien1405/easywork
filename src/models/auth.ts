import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './stack'

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>

export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>

export interface LoginPayload {
  username: string
  password: string
}
export interface SignUpPayload {
  username: string
  password: string
  fullName: string
}
