import React from 'react'
import firestore from '@react-native-firebase/firestore'

import { Container, TaskForm } from '@/components'
import { AddEditTaskScreenProps, Task } from '@/models'

export function AddEditTaskScreen({ navigation }: AddEditTaskScreenProps) {
  const handleTaskSubmit = async (payload: Task) => {
    try {
      await firestore().collection('tasks').add(payload)
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container back title="Add new task" isScroll>
      <TaskForm onSubmit={handleTaskSubmit} />
    </Container>
  )
}
