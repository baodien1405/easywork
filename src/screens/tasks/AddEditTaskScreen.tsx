import React from 'react'

import { Container, TaskForm } from '@/components'
import { Task } from '@/models'

export function AddEditTaskScreen() {
  const handleTaskSubmit = (payload: Task) => {
    console.log('🚀 ~ handleTaskSubmit ~ payload:', payload)
  }

  return (
    <Container back title="Add new task" isScroll>
      <TaskForm onSubmit={handleTaskSubmit} />
    </Container>
  )
}
