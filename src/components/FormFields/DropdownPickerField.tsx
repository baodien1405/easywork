import { ArrowDown2, SearchNormal1, TickCircle } from 'iconsax-react-native'
import React, { ReactNode, useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { AppButton, AppText, Row, Space, Title } from '@/components'
import { COLORS } from '@/constants'
import { globalStyles } from '@/styles'
import { Option } from '@/models'
import { InputField } from '@/components/FormFields'

type DropdownPickerFieldProps<T extends FieldValues> = {
  label?: string
  placeholder?: string
  prefix?: ReactNode
  suffix?: ReactNode
  name: Path<T>
  control: Control<T>

  items: Option[]
  multiple?: boolean
  onChange?: (ids: string[]) => void
}

export function DropdownPickerField<T extends FieldValues>({
  name,
  control,
  label,
  items,
  multiple,
  onChange: externalOnChange
}: DropdownPickerFieldProps<T>) {
  const [isVisible, setIsVisible] = useState(false)
  const [searchText, setSearchText] = useState('')

  const filteredItems = items.filter((x) =>
    x.label.toLowerCase().includes(searchText.toLowerCase())
  )

  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const selectedIdList: string[] = value || []

  const handleSelectUser = (userId: string) => {
    if (multiple) {
      const newIdList = [...selectedIdList]
      const index = newIdList.findIndex((id) => id === userId)

      if (index !== -1) {
        newIdList.splice(index, 1)
      } else {
        newIdList.push(userId)
      }

      onChange(newIdList)
      externalOnChange?.(newIdList)
    } else {
      onChange([userId])
      externalOnChange?.([userId])
    }
  }

  const handleRemoveSelectedItem = (index: number) => {
    const newUserIdList = [...selectedIdList]
    newUserIdList.splice(index, 1)

    onChange(newUserIdList)
    externalOnChange?.(newUserIdList)
  }

  return (
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
        onPress={() => setIsVisible(true)}
      >
        {selectedIdList.length ? (
          <Row justify="flex-start" styles={{ flexWrap: 'wrap' }}>
            {selectedIdList.map((id, index) => {
              const item = items.find((x) => x.value === id)

              return (
                <Row
                  key={id}
                  styles={styles.itemContainer}
                  onPress={() => handleRemoveSelectedItem(index)}
                >
                  <AppText text={item?.label || ''} flex={0} />
                  <Space width={8} />
                  <AntDesign name="close" size={14} color={COLORS.text} />
                </Row>
              )
            })}
          </Row>
        ) : (
          <AppText text="Select members" color={COLORS.gray2} />
        )}

        <ArrowDown2 size={20} color={COLORS.text} />
      </Row>

      {error?.message && (
        <AppText text={error.message} color={COLORS.error} flex={0} styles={styles.errorMessage} />
      )}

      <Modal
        visible={isVisible}
        style={styles.modal}
        transparent
        animationType="slide"
        statusBarTranslucent
      >
        <View style={[globalStyles.container, styles.modalContainer]}>
          <FlatList
            ListHeaderComponent={
              <Row>
                <View style={styles.searchContainer}>
                  <InputField
                    name="search"
                    placeholder="Search..."
                    prefix={<SearchNormal1 size={20} color={COLORS.gray2} />}
                    control={control as any}
                    onChangeText={(text) => setSearchText(text)}
                    allowClear
                  />
                </View>

                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <AppText text="Cancel" color="coral" flex={0} />
                </TouchableOpacity>
              </Row>
            }
            showsVerticalScrollIndicator={false}
            style={globalStyles.flex1}
            data={filteredItems}
            renderItem={({ item }) => {
              const isSelected = selectedIdList.includes(item.value)

              return (
                <Row
                  key={item.value}
                  styles={{ paddingVertical: 16 }}
                  onPress={() => handleSelectUser(item.value)}
                >
                  <AppText text={item.label} size={16} color={isSelected ? 'coral' : COLORS.text} />
                  {isSelected && <TickCircle size={22} color="coral" />}
                </Row>
              )
            }}
          />

          <AppButton text="Confirm" onPress={() => setIsVisible(false)} />
        </View>
      </Modal>
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
  row: {
    justifyContent: 'space-between',
    paddingVertical: 14
  },
  input: {
    margin: 0,
    padding: 0,
    marginVertical: 6,
    flex: 1,
    textAlignVertical: 'top'
  },
  errorMessage: {
    marginTop: 8
  },
  modal: {
    flex: 1
  },
  modalContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 60
  },
  searchContainer: {
    flex: 1,
    marginRight: 12
  },
  itemContainer: {
    marginRight: 8,
    padding: 4,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: COLORS.gray2,
    marginBottom: 8
  }
})
