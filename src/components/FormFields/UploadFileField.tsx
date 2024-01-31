import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import { AttachSquare } from 'iconsax-react-native'

import { AppText, Row, Space, Title } from '@/components'
import { COLORS } from '@/constants'

type UploadFileFieldProps<T extends FieldValues> = {
  label?: string
  multiple?: boolean
  name: Path<T>
  control: Control<T>
}

export function UploadFileField<T extends FieldValues>({
  label,
  name,
  control
}: UploadFileFieldProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const fileNameList: string[] = value?.map((file: DocumentPickerResponse) => file.name) || []

  const handlePickerDocument = () => {
    DocumentPicker.pick({})
      .then((res) => onChange(res))
      .catch(() => {})
  }

  return (
    <View style={styles.container}>
      <Row justify="flex-start" onPress={handlePickerDocument}>
        {label && <Title text={label} flex={0} />}
        <Space width={8} />
        <AttachSquare size={20} color={COLORS.white1} />
      </Row>

      {fileNameList.map((fileName) => (
        <Row key={`attachment ${fileName}`} styles={styles.fileName}>
          <AppText text={fileName || ''} color={error?.message ? COLORS.error : 'green'} />
        </Row>
      ))}

      {error?.message && <AppText text={error.message} color={COLORS.error} flex={0} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  fileName: {
    paddingVertical: 12
  }
})
