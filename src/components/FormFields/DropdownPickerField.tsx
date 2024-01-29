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
  const [selectedUserIdList, setSelectedUserIdList] = useState<string[]>([])

  const filteredItems = items.filter((x) =>
    x.label.toLowerCase().includes(searchText.toLowerCase())
  )

  const {
    field: { onChange },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const handleSelectUser = (userId: string) => {
    if (multiple) {
      setSelectedUserIdList((prevState) => {
        const newUserIdList = [...prevState]
        const index = newUserIdList.findIndex((id) => id === userId)

        if (index !== -1) {
          newUserIdList.splice(index, 1)
        } else {
          newUserIdList.push(userId)
        }

        return newUserIdList
      })
    } else {
      setSelectedUserIdList([userId])
    }
  }

  const handleRemoveSelectedItem = (index: number) => {
    setSelectedUserIdList((prevState) => {
      const newUserIdList = [...prevState]
      newUserIdList.splice(index, 1)

      return newUserIdList
    })
  }

  const handleConfirm = () => {
    onChange(selectedUserIdList)
    externalOnChange?.(selectedUserIdList)

    setIsVisible(false)
  }

  return (
    <View style={styles.container}>
      {label && <Title text={label} styles={styles.label} />}

      <Row styles={[globalStyles.inputContainer, styles.row]} onPress={() => setIsVisible(true)}>
        {selectedUserIdList.length ? (
          <Row justify="flex-start" styles={{ flexWrap: 'wrap' }}>
            {selectedUserIdList.map((id, index) => {
              const item = items.find((x) => x.value === id)

              return (
                <Row
                  key={id}
                  styles={{
                    marginRight: 8,
                    padding: 4,
                    borderRadius: 100,
                    borderWidth: 0.5,
                    borderColor: COLORS.gray2,
                    marginBottom: 8
                  }}
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
                    onChangeText={(value) => setSearchText(value)}
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
              const isSelected = selectedUserIdList.includes(item.value)

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

          <AppButton text="Confirm" onPress={handleConfirm} />
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
  }
})
