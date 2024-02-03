import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { AddSquare, ArrowLeft2, CalendarEdit, Clock, TickCircle } from 'iconsax-react-native'
import dayjs from 'dayjs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { AppText, AvatarGroup, Card, ProgressBar, Row, Section, Space, Title } from '@/components'
import { Task, TaskDetailsScreenProps } from '@/models'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { globalStyles } from '@/styles'

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
    <ScrollView style={(globalStyles.flex1, { backgroundColor: COLORS.bgColor })}>
      <Section
        styles={{
          backgroundColor: color,
          paddingBottom: 18,
          paddingTop: 60,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20
        }}
      >
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

      <Section>
        <Title text="Description" />
        <Card
          bgColor={COLORS.bgColor}
          styles={{ marginTop: 12, borderWidth: 1, borderColor: COLORS.gray, borderRadius: 12 }}
        >
          <AppText text={task.description} />
        </Card>
      </Section>

      <Section>
        <Card>
          <Row>
            <AppText text="Files & Links" flex={0} />
            <Row styles={globalStyles.flex1}>
              <Ionicons
                name="document-text"
                size={38}
                color="#0263D1"
                style={globalStyles.documentImg}
              />
              <AntDesign
                name="pdffile1"
                size={34}
                color="#E5252A"
                style={globalStyles.documentImg}
              />
              <MaterialCommunityIcons
                name="file-excel"
                size={40}
                color={COLORS.success}
                style={globalStyles.documentImg}
              />
              <AntDesign name="addfile" size={32} color={COLORS.white1} />
            </Row>
          </Row>
        </Card>
      </Section>

      <Section>
        <Row>
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: COLORS.success,
              marginRight: 4,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View
              style={{ height: 16, width: 16, borderRadius: 100, backgroundColor: COLORS.success }}
            />
          </View>

          <AppText text="Progress" size={18} color={COLORS.text} flex={1} />
        </Row>

        <Space height={12} />

        <Row justify="space-between">
          <AppText text="Slide" />
          <AppText text="70%" font={FONT_FAMILIES.bold} size={18} flex={0} />
        </Row>

        <Row justify="flex-start">
          <View style={{ flex: 1 }}>
            <ProgressBar percent="80%" color={color} />
          </View>
        </Row>
      </Section>

      <Section>
        <Row>
          <Title text="Sub tasks" size={20} flex={1} />
          <AddSquare size={24} color={COLORS.success} variant="Bold" />
        </Row>

        <Space height={12} />

        {Array.from({ length: 3 }).map(() => (
          <Card styles={{ marginBottom: 12 }}>
            <Row>
              <TickCircle variant="Bold" size={22} color={COLORS.success} />
              <Space width={8} />
              <AppText text="abc" />
            </Row>
          </Card>
        ))}
      </Section>
    </ScrollView>
  )
}
