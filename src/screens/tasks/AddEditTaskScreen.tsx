import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

import { Container, TaskForm } from '@/components'
import { AddEditTaskScreenProps, Task } from '@/models'

export function AddEditTaskScreen({ navigation, route }: AddEditTaskScreenProps) {
  const taskId = route.params?.taskId
  const isAddMode = !taskId
  const [task, setTask] = useState<Task>()

  useEffect(() => {
    const fetchTaskDetailsAPI = async () => {
      await firestore()
        .doc(`tasks/${taskId}`)
        .onSnapshot((snap) => {
          if (!snap.exists) return
          const newTask = {
            id: taskId,
            ...snap.data()
          } as Task

          setTask(newTask)
        })
    }

    if (taskId) {
      fetchTaskDetailsAPI()
    }
  }, [taskId])

  const handleTaskSubmit = async (payload: Task) => {
    try {
      if (isAddMode) {
        await firestore()
          .collection('tasks')
          .add({
            ...payload,
            createdAt: Date.now(),
            updatedAt: Date.now()
          })
      } else {
        await firestore()
          .doc(`tasks/${taskId}`)
          .update({
            ...payload,
            updatedAt: Date.now()
          })
      }
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container back title={isAddMode ? 'Add new task' : `Edit task #${taskId}`} isScroll>
      {(isAddMode || Boolean(task)) && (
        <TaskForm initialValues={task} onSubmit={handleTaskSubmit} />
      )}
    </Container>
  )
}
