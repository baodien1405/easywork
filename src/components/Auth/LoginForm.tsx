import { yupResolver } from '@hookform/resolvers/yup'
import { Lock, Sms } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

import { AppButton } from '@/components'
import { InputField } from '@/components/FormFields'
import { COLORS } from '@/constants'
import { useLoginSchema } from '@/hooks'
import { LoginPayload } from '@/models'

interface LoginFormProps {
  initialValues?: LoginPayload
  onSubmit?: (payload: LoginPayload) => void
}

export function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const schema = useLoginSchema()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<LoginPayload>({
    defaultValues: {
      ...initialValues
    },
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = async (formValues: LoginPayload) => {
    await onSubmit?.(formValues)
  }

  return (
    <View>
      <InputField
        name="username"
        control={control}
        label="Username"
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
        text="Login"
        onPress={handleSubmit(handleFormSubmit)}
        loading={isSubmitting}
        styles={{ marginTop: 20 }}
      />
    </View>
  )
}
