import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ArrowDown2 } from 'iconsax-react-native'
import DatePicker from 'react-native-date-picker'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import dayjs from 'dayjs'

import { AppText, Row, Space, Title } from '@/components'
import { globalStyles } from '@/styles'
import { COLORS, FORMAT_TYPES } from '@/constants'

type DatePickerFieldProps<T extends FieldValues> = {
  label?: string
  placeholder?: string
  type?: 'date' | 'datetime' | 'time'
  locale?: string
  name: Path<T>
  control: Control<T>
  format?: string

  onDateChange?: (date: Date) => void
}

export function DatePickerField<T extends FieldValues>({
  name,
  control,
  label,
  type,
  placeholder,
  locale = 'vi',
  format = FORMAT_TYPES.DATE,
  onDateChange: externalOnDateChange
}: DatePickerFieldProps<T>) {
  const [visible, setVisible] = useState(false)

  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const dateString = value ? dayjs(value).format(format) : placeholder ? placeholder : ''

  return (
    <>
      <View style={styles.container}>
        {label && <Title text={label} styles={styles.label} />}

        <Row
          styles={[
            globalStyles.inputContainer,
            styles.row,
            {
              borderWidth: 0.5,
              borderColor: error?.message ? COLORS.error : COLORS.gray2
            }
          ]}
          onPress={() => setVisible(true)}
        >
          <AppText text={dateString} color={value ? COLORS.text : '#676767'} />

          <ArrowDown2 size={20} color={COLORS.text} />
        </Row>

        {error?.message && (
          <AppText
            text={error.message}
            color={COLORS.error}
            flex={0}
            styles={styles.errorMessage}
          />
        )}
      </View>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Title text="Date time picker" color={COLORS.text} />

            <View style={styles.datePickerContainer}>
              <DatePicker
                mode={type}
                date={value || new Date()}
                locale={locale}
                onDateChange={(date) => {
                  onChange(date)
                  externalOnDateChange?.(date)
                }}
              />
            </View>

            <Row>
              <TouchableOpacity
                activeOpacity={1}
                style={[globalStyles.row, styles.button, { backgroundColor: COLORS.gray2 }]}
                onPress={() => setVisible(false)}
              >
                <AppText text="Close" flex={0} />
              </TouchableOpacity>

              <Space width={12} />

              <TouchableOpacity
                activeOpacity={1}
                style={[globalStyles.row, styles.button]}
                onPress={() => setVisible(false)}
              >
                <AppText text="Save" flex={0} />
              </TouchableOpacity>
            </Row>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    marginBottom: 8
  },
  row: {
    paddingVertical: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalInner: {
    margin: 20,
    width: '90%',
    backgroundColor: COLORS.white1,
    padding: 20,
    borderRadius: 20
  },
  datePickerContainer: {
    marginBottom: 16
  },
  buttonContainer: {
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#3618e0',
    padding: 10,
    borderRadius: 12,
    width: '45%'
  },
  errorMessage: {
    marginTop: 8
  }
})
