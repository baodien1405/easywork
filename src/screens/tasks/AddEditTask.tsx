import React from 'react'

import { Container, TaskForm } from '@/components'

export function AddEditTask() {
  return (
    <Container back title="Add new task">
      <TaskForm />
    </Container>
  )
}
