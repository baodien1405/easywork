import { yupResolver } from '@hookform/resolvers/yup'
import { User } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { DocumentPickerResponse } from 'react-native-document-picker'
import storage from '@react-native-firebase/storage'

import { AppButton, Row, Section, Space } from '@/components'
import {
  DatePickerField,
  DropdownPickerField,
  InputField,
  UploadFileField
} from '@/components/FormFields'
import { COLORS, FORMAT_TYPES } from '@/constants'
import { useTaskSchema } from '@/hooks'
import { Task } from '@/models'
import { globalStyles } from '@/styles'
import { useUserList } from '@/hooks'

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

  const { data: userList } = useUserList()

  const memberOptions = userList.map((user) => ({
    label: user.name,
    value: user.id
  }))

  const handleUploadFileToStorage = async (item: DocumentPickerResponse) => {
    try {
      const filename = item.name || `file${Date.now()}`
      const path = `documents/${filename}`

      await storage().ref(path).putFile(item.uri)

      return await storage().ref(path).getDownloadURL()
    } catch (error) {
      console.log('Failed to upload file ', error)
    }
  }

  const handleFormSubmit = async (formValues: Task) => {
    const fileUrlsPromiseList = formValues?.fileList?.map((file: DocumentPickerResponse) => {
      return handleUploadFileToStorage(file)
    })

    const fileUrls = await Promise.all(fileUrlsPromiseList)

    delete formValues.fileList
    formValues.fileUrls = fileUrls

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

      <DropdownPickerField
        name="uids"
        control={control}
        label="Members"
        items={memberOptions}
        multiple
      />

      <UploadFileField name="fileList" control={control} label="Attachments" />

      <AppButton
        text="Add"
        onPress={handleSubmit(handleFormSubmit)}
        loading={isSubmitting}
        styles={{ marginTop: 20 }}
      />
    </Section>
  )
}
