import firestore from '@react-native-firebase/firestore'
import { AddSquare, TickCircle } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import dayjs from 'dayjs'

import { AppText, Card, Row, SubtaskForm, Title } from '@/components'
import { COLORS } from '@/constants'
import { SubTask } from '@/models'

interface SubtaskListProps {
  taskId: string
  onProgress?: (progress: number) => void
}

export const SubtaskList = ({ taskId, onProgress }: SubtaskListProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [subtaskList, setSubtaskList] = useState<SubTask[]>([])

  useEffect(() => {
    const fetchTaskDetailsAPI = async () => {
      await firestore()
        .collection('subtasks')
        .where('taskId', '==', taskId)
        .onSnapshot((snap) => {
          if (snap.empty) return

          const items: any[] = []

          snap.forEach((item) => {
            items.push({
              id: item.id,
              ...item.data()
            })
          })

          setSubtaskList(items)
        })
    }
    fetchTaskDetailsAPI()
  }, [taskId])

  useEffect(() => {
    if (subtaskList.length) {
      const completedPercent = subtaskList.filter((x) => x.isCompleted).length / subtaskList.length
      onProgress?.(completedPercent)
    }
  }, [subtaskList, onProgress])

  const handleUpdateSubtask = async (item: SubTask) => {
    try {
      await firestore().doc(`subtasks/${item.id}`).update({ isCompleted: !item.isCompleted })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddSubtask = async (payload: SubTask) => {
    try {
      const newSubtask = {
        ...payload,
        taskId,
        isCompleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      await firestore().collection('subtasks').add(newSubtask)

      Alert.alert('Success')
      setIsOpenModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Row styles={{ marginBottom: 12 }}>
        <Title text="Sub tasks" size={20} flex={1} />
        <TouchableOpacity onPress={() => setIsOpenModal(true)}>
          <AddSquare size={24} color={COLORS.success} variant="Bold" />
        </TouchableOpacity>
      </Row>

      {subtaskList.map((item) => (
        <Card styles={{ marginBottom: 12 }} key={item.id}>
          <Row onPress={() => handleUpdateSubtask(item)}>
            <TickCircle
              variant={item.isCompleted ? 'Bold' : 'Outline'}
              size={22}
              color={COLORS.success}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <AppText text={item.title} />
              <AppText size={12} text={dayjs(item.createdAt).format('DD MMM YYYY')} />
            </View>
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
