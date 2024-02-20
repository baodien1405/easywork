import { Slider } from '@miblanchard/react-native-slider'
import firestore from '@react-native-firebase/firestore'
import dayjs from 'dayjs'
import { ArrowLeft2, CalendarEdit, Clock, Edit2, TickSquare } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import { DocumentPickerResponse } from 'react-native-document-picker'

import {
  AppButton,
  AppText,
  AvatarGroup,
  Card,
  Row,
  Section,
  Space,
  SubtaskList,
  Title
} from '@/components'
import { UploadFileField } from '@/components/FormFields'
import { COLORS, FONT_FAMILIES, SCREENS } from '@/constants'
import { Task, TaskDetailsScreenProps } from '@/models'
import { globalStyles } from '@/styles'
import { convertFileSizeToMB, handleUploadFileToStorage } from '@/utils'

export function TaskDetailsScreen({ navigation, route }: TaskDetailsScreenProps) {
  const { taskId, color = 'rgba(113, 77, 217, 0.9)' } = route.params
  const [task, setTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUrgent, setIsUrgent] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileList, setFileList] = useState<DocumentPickerResponse[]>([])
  const { control } = useForm()

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

  useEffect(() => {
    if (task?.progress) {
      setProgress(task.progress)
    }
  }, [task?.progress])

  useEffect(() => {
    if (task?.isUrgent) {
      setIsUrgent(task.isUrgent || false)
    }
  }, [task?.isUrgent])

  if (!task) return <></>

  const handleUpdateTask = async () => {
    try {
      setIsLoading(true)
      const attachmentListPromiseList = fileList?.map((file: DocumentPickerResponse) => {
        return handleUploadFileToStorage(file)
      })

      const attachmentList = await Promise.all(attachmentListPromiseList)
      const updateData: Task = {
        ...task,
        progress,
        isUrgent: isUrgent,
        attachments: (task?.attachments || []).concat(attachmentList)
      }

      await firestore().doc(`tasks/${taskId}`).update(updateData)

      Alert.alert('Update task success')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

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
        <Row justify="flex-start" styles={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={COLORS.text} />
          </TouchableOpacity>

          <Space width={12} />

          <Title text={task.title} numberOfLines={1} flex={1} />

          <Space width={12} />

          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              borderRadius: 100,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() =>
              navigation.navigate(SCREENS.ADD_EDIT_TASK_SCREEN, {
                taskId: taskId
              })
            }
          >
            <Edit2 size={16} color={COLORS.white1} />
          </TouchableOpacity>
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
            <AvatarGroup uids={task.uids} />
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
        <Row onPress={() => setIsUrgent((prevState) => !prevState)}>
          <TickSquare variant={isUrgent ? 'Bold' : 'Outline'} size={24} color={COLORS.success} />
          <Space width={8} />
          <AppText text="isUrgent" flex={1} font={FONT_FAMILIES.semibold} size={18} />
        </Row>
      </Section>

      <Section>
        <UploadFileField
          name="fileList"
          control={control}
          label="Files & Links"
          onChange={(value) => setFileList(value)}
        />

        {task.attachments?.map((item) => (
          <View style={{ marginBottom: 8 }} key={item.url}>
            <AppText text={item.name} color={COLORS.success} />
            <AppText text={`${convertFileSizeToMB(item.size).toFixed(2)} MB`} size={12} />
          </View>
        ))}
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
              style={{
                height: 16,
                width: 16,
                borderRadius: 100,
                backgroundColor: COLORS.success
              }}
            />
          </View>

          <AppText text="Progress" size={18} color={COLORS.text} flex={1} />
        </Row>

        <Space height={12} />

        <Row>
          <View style={{ flex: 1 }}>
            <Slider
              disabled
              value={progress}
              onValueChange={(value) => setProgress(value[0])}
              thumbTintColor={COLORS.success}
              maximumTrackTintColor={COLORS.gray2}
              minimumTrackTintColor={COLORS.success}
              trackStyle={{ height: 10, borderRadius: 100 }}
              thumbStyle={{ borderWidth: 2, borderColor: COLORS.white1 }}
            />
          </View>

          <Space width={8} />

          <AppText
            text={`${Math.round(progress * 100)}%`}
            font={FONT_FAMILIES.bold}
            size={18}
            flex={0}
          />
        </Row>
      </Section>

      {taskId && (
        <Section>
          <SubtaskList taskId={taskId} onProgress={(value) => setProgress(value)} />
        </Section>
      )}

      <Section>
        <AppButton text="Update" onPress={handleUpdateTask} color="#3618e0" loading={isLoading} />
      </Section>
    </ScrollView>
  )
}
