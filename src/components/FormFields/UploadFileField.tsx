import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { View, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import { CloseSquare, DocumentUpload } from 'iconsax-react-native'

import { AppText, Row, Space, Title } from '@/components'
import { COLORS } from '@/constants'
import { globalStyles } from '@/styles'

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
  const [isOpenModal, setIsOpenModal] = useState(false)
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  useEffect(() => {
    if (Array.isArray(value) && value?.length > 0) {
      setIsOpenModal(true)
    }
  }, [value])

  const fileNameList: string[] = value?.map((file: DocumentPickerResponse) => file.name) || []
  const fileSizeList: number[] = value?.map((file: DocumentPickerResponse) => file.size) || []

  const handlePickerDocument = () => {
    DocumentPicker.pick({})
      .then((res) => onChange(res))
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
          <AppText text={fileName || ''} color={error?.message ? COLORS.error : 'green'} />
        </Row>
      ))}

      {error?.message && <AppText text={error.message} color={COLORS.error} flex={0} />}

      <Modal
        visible={isOpenModal}
        statusBarTranslucent
        animationType="slide"
        style={{ flex: 1 }}
        transparent
      >
        <View
          style={[
            globalStyles.container,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              justifyContent: 'center',
              alignItems: 'center'
            }
          ]}
        >
          <View
            style={{
              width: Dimensions.get('window').width * 0.8,
              height: 'auto',
              padding: 12,
              borderRadius: 12,
              backgroundColor: COLORS.white1
            }}
          >
            <Row>
              <Title text="Uploading" flex={1} color={COLORS.gray} />
              <TouchableOpacity onPress={() => setIsOpenModal(false)}>
                <CloseSquare size={24} color={COLORS.gray} />
              </TouchableOpacity>
            </Row>

            <View>
              <AppText text={fileNameList?.[0]} color={COLORS.gray} flex={0} />
              <AppText text={fileSizeList?.[0]?.toString()} color={COLORS.gray} flex={0} />
            </View>
          </View>
        </View>
      </Modal>
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
