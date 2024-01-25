import React, { ReactNode } from 'react'
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { AppText, Row, Title } from '@/components'
import { globalStyles } from '@/styles'
import { COLORS } from '@/constants'

type InputFieldProps<T extends FieldValues> = TextInputProps & {
  label?: string
  placeholder?: string
  prefix?: ReactNode
  suffix?: ReactNode
  allowClear?: boolean
  name: Path<T>
  control: Control<T>
}

export function InputField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  prefix,
  suffix,
  allowClear,
  multiline,
  numberOfLines,
  onChangeText: externalOnChangeText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onBlur: externalOnBlur,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value: externalValue,
  ...rest
}: InputFieldProps<T>) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <View style={styles.container}>
      {label && <Title text={label} styles={styles.label} />}

      <Row
        styles={[
          globalStyles.inputContainer,
          {
            minHeight: multiline && numberOfLines ? 32 * numberOfLines : 32,
            paddingVertical: 14,
            paddingHorizontal: 10,
            alignItems: multiline && numberOfLines ? 'flex-start' : 'center'
          }
        ]}
      >
        {prefix && <View>{prefix}</View>}

        <View
          style={{
            flex: 1,
            paddingLeft: prefix ? 8 : 0,
            paddingRight: suffix ? 8 : 0
          }}
        >
          <TextInput
            value={value}
            style={[globalStyles.text, styles.input]}
            placeholder={placeholder}
            placeholderTextColor="#676767"
            multiline={multiline}
            numberOfLines={numberOfLines}
            ref={ref}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text)
              externalOnChangeText?.(text)
            }}
            {...rest}
          />
        </View>

        {suffix && <View>{suffix}</View>}

        {allowClear && (
          <TouchableOpacity>
            <AntDesign name="close" size={20} color={COLORS.white1} />
          </TouchableOpacity>
        )}
      </Row>

      {error?.message && <AppText text={error.message} color={COLORS.error} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    marginBottom: 8
  },
  input: {
    margin: 0,
    padding: 0,
    marginVertical: 6,
    flex: 1,
    textAlignVertical: 'top'
  }
})
