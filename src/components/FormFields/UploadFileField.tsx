import { DocumentUpload } from 'iconsax-react-native'
import React from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'

import { AppText, Row, Space, Title } from '@/components'
import { COLORS } from '@/constants'

type UploadFileFieldProps<T extends FieldValues> = {
  label?: string
  multiple?: boolean
  name: Path<T>
  control: Control<T>
  onChange?: (fileList: DocumentPickerResponse[]) => void
}

export function UploadFileField<T extends FieldValues>({
  label,
  name,
  control,
  onChange: externalOnChange
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
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.xlsx]
    })
      .then((res) => {
        onChange(res)
        externalOnChange?.(res)
      })
      .catch(() => {})
  }

  return (
    <View style={styles.container}>
      <Row justify="space-between" onPress={handlePickerDocument}>
        {label && <Title text={label} flex={0} />}
        <Space width={8} />
        <DocumentUpload size={24} color={COLORS.white1} />
      </Row>

      {fileNameList.map((fileName) => (
        <Row key={`attachment ${fileName}`} styles={styles.fileName}>
          <AppText text={fileName} color={error?.message ? COLORS.error : COLORS.success} />
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
