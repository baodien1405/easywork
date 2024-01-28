import { yupResolver } from '@hookform/resolvers/yup'
import { Lock, Sms, User } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

import { AppButton } from '@/components'
import { InputField } from '@/components/FormFields'
import { COLORS } from '@/constants'
import { useSignUpSchema } from '@/hooks'
import { SignUpPayload } from '@/models'

interface SignUpFormProps {
  initialValues?: SignUpPayload
  onSubmit?: (payload: SignUpPayload) => void
}

export function SignUpForm({ initialValues, onSubmit }: SignUpFormProps) {
  const schema = useSignUpSchema()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignUpPayload>({
    defaultValues: {
      ...initialValues
    },
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = async (formValues: SignUpPayload) => {
    await onSubmit?.(formValues)
  }

  return (
    <View>
      <InputField
        name="name"
        control={control}
        label="Name"
        placeholder="Name"
        prefix={<User size={22} color={COLORS.white1} />}
        allowClear
      />

      <InputField
        name="email"
        control={control}
        label="Email"
        placeholder="abc@gmail.com"
        prefix={<Sms size={22} color={COLORS.white1} />}
        allowClear
      />

      <InputField
        name="password"
        control={control}
        label="Password"
        placeholder="Enter your password"
        prefix={<Lock size={22} color={COLORS.white1} />}
        isPassword
      />

      <AppButton
        text="Sign up"
        onPress={handleSubmit(handleFormSubmit)}
        loading={isSubmitting}
        styles={{ marginTop: 20 }}
      />
    </View>
  )
}
