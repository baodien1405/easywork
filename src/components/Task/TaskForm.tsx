import { yupResolver } from '@hookform/resolvers/yup'
import { User } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'

import { AppText, Section } from '@/components'
import { InputField } from '@/components/FormFields'
import { COLORS } from '@/constants'
import { useTaskSchema } from '@/hooks'
import { globalStyles } from '@/styles'
import { Task } from '@/models'

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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[globalStyles.row, styles.button]}
          onPress={handleSubmit(handleFormSubmit)}
        >
          {isSubmitting ? <ActivityIndicator size={20} /> : <AppText text="Add" flex={0} />}
        </TouchableOpacity>
      </View>
    </Section>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#3618e0',
    padding: 10,
    borderRadius: 12,
    width: '100%'
  }
})
