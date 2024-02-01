import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { ArrowLeft2, CalendarEdit, Clock } from 'iconsax-react-native'

import { AppText, AvatarGroup, Row, Section, Space, Title } from '@/components'
import { Task, TaskDetailsScreenProps } from '@/models'
import { COLORS } from '@/constants'
import { globalStyles } from '@/styles'
import dayjs from 'dayjs'

export function TaskDetailsScreen({ navigation, route }: TaskDetailsScreenProps) {
  const { taskId, color = 'rgba(113, 77, 217, 0.9)' } = route.params
  const [task, setTask] = useState<Task | null>(null)

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
    fetchTaskDetailsAPI()
  }, [taskId])

  if (!task) return <></>

  return (
    <ScrollView style={globalStyles.flex1}>
      <Section styles={{ backgroundColor: color, paddingVertical: 20, paddingTop: 48 }}>
        <Row justify="flex-start">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={COLORS.text} />
          </TouchableOpacity>

          <Space width={12} />

          <Title text={task.title} />
        </Row>

        <Space height={30} />
        <AppText text="Due date" />

        <Row>
          <Row styles={{ flex: 1 }}>
            <Clock size={18} color={COLORS.text} />
            <Space width={8} />
            <AppText
              text={`${dayjs((task.start as any).toDate()).format('HH A')} - ${dayjs(
                (task.end as any).toDate()
              ).format('HH A')}`}
            />
          </Row>
          <Row styles={{ flex: 1 }}>
            <CalendarEdit size={18} color={COLORS.text} />
            <Space width={8} />
            <AppText text={dayjs((task.dueDate as any).toDate()).format('DD MMM YYYY')} />
          </Row>
          <Row>
            <AvatarGroup />
          </Row>
        </Row>
      </Section>
    </ScrollView>
  )
}
