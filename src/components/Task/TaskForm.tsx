import { yupResolver } from '@hookform/resolvers/yup'
import { User } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

import { AppButton, Row, Section, Space } from '@/components'
import { DatePickerField, InputField } from '@/components/FormFields'
import { COLORS, FORMAT_TYPES } from '@/constants'
import { useTaskSchema } from '@/hooks'
import { Task } from '@/models'
import { globalStyles } from '@/styles'

interface TaskFormProps {
  initialValues?: Task
  onSubmit?: (payload: Task) => void
}

export function TaskForm({ initialValues, onSubmit }: TaskFormProps) {
  const schema = useTaskSchema()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<Task>({
    defaultValues: {
      ...initialValues
    },
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = async (formValues: Task) => {
    await onSubmit?.(formValues)
  }

  return (
    <Section>
      <InputField
        name="title"
        control={control}
        label="Title"
        placeholder="Title of task"
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

      <DatePickerField
        name="dueDate"
        control={control}
        type="date"
        label="Due date"
        placeholder="Select date"
      />

      <Row>
        <View style={globalStyles.flex1}>
          <DatePickerField
            name="start"
            control={control}
            type="time"
            label="Start"
            format={FORMAT_TYPES.TIME}
            placeholder="Select date"
          />
        </View>

        <Space width={16} />

        <View style={globalStyles.flex1}>
          <DatePickerField
            name="end"
            control={control}
            type="time"
            label="Date"
            format={FORMAT_TYPES.TIME}
            placeholder="Select date"
          />
        </View>
      </Row>

      <AppButton
        text="Add"
        onPress={handleSubmit(handleFormSubmit)}
        loading={isSubmitting}
        styles={{ marginTop: 20 }}
      />
    </Section>
  )
}
