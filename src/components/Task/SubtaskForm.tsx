import { yupResolver } from '@hookform/resolvers/yup'
import { User } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'

import { InputField } from '@/components/FormFields'
import { COLORS } from '@/constants'
import { useTaskSchema } from '@/hooks'
import { SubTask } from '@/models'
import { AppButton, Row, Space } from '@/components'

interface SubtaskFormProps {
  initialValues?: SubTask
  onCancel: () => void
  onSubmit?: (payload: SubTask) => void
}

export function SubtaskForm({ initialValues, onCancel, onSubmit }: SubtaskFormProps) {
  const schema = useTaskSchema()
  const { control, handleSubmit } = useForm<SubTask>({
    defaultValues: {
      ...initialValues
    },
    resolver: yupResolver(schema.pick(['title', 'description']))
  })

  const handleFormSubmit = async (formValues: SubTask) => {
    await onSubmit?.(formValues)
  }

  return (
    <>
      <InputField
        name="title"
        control={control}
        label="Title"
        placeholder="Title"
        prefix={<User size={22} color={COLORS.white1} />}
        allowClear
      />

      <InputField
        name="description"
        control={control}
        label="Description"
        placeholder="Content"
        allowClear
        multiline
        numberOfLines={3}
      />

      <Row styles={{ marginTop: 16 }}>
        <AppButton
          text="Cancel"
          onPress={onCancel}
          color={COLORS.gray2}
          styles={{ width: '45%', paddingVertical: 12 }}
        />

        <Space width={12} />

        <AppButton
          text="Add"
          color="#3618e0"
          styles={{ width: '45%', paddingVertical: 12 }}
          onPress={handleSubmit(handleFormSubmit)}
        />
      </Row>
    </>
  )
}
