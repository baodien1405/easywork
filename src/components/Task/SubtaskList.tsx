import { AddSquare, TickCircle } from 'iconsax-react-native'
import React, { useState } from 'react'
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore'

import { AppText, Card, Row, Space, SubtaskForm, Title } from '@/components'
import { COLORS } from '@/constants'
import { SubTask } from '@/models'

interface SubtaskListProps {
  taskId: string
}

export const SubtaskList = ({ taskId }: SubtaskListProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleAddSubtask = async (payload: SubTask) => {
    try {
      const newSubtask = {
        ...payload,
        taskId,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      await firestore().collection('subTasks').add(newSubtask)

      Alert.alert('Success')
      setIsOpenModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Row>
        <Title text="Sub tasks" size={20} flex={1} />
        <TouchableOpacity onPress={() => setIsOpenModal(true)}>
          <AddSquare size={24} color={COLORS.success} variant="Bold" />
        </TouchableOpacity>
      </Row>

      <Space height={12} />

      {Array.from({ length: 3 }).map((item, index) => (
        <Card styles={{ marginBottom: 12 }} key={index}>
          <Row>
            <TickCircle variant="Bold" size={22} color={COLORS.success} />
            <Space width={8} />
            <AppText text="abc" />
          </Row>
        </Card>
      ))}

      <Modal visible={isOpenModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Title
              text="Add new subtask"
              size={24}
              styles={{ textAlign: 'center', marginBottom: 12 }}
            />
            <SubtaskForm onCancel={() => setIsOpenModal(false)} onSubmit={handleAddSubtask} />
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalInner: {
    margin: 20,
    width: '90%',
    backgroundColor: COLORS.gray,
    padding: 20,
    borderRadius: 20
  }
})
