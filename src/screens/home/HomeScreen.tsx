import { Add, Edit2, Element4, Logout, Notification, SearchNormal1 } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import {
  AppButton,
  AppText,
  AvatarGroup,
  Card,
  CardImage,
  Circular,
  Container,
  ProgressBar,
  Row,
  Section,
  Space,
  Tag,
  Title
} from '@/components'
import { COLORS, FONT_FAMILIES, FORMAT_TYPES, SCREENS } from '@/constants'
import { globalStyles } from '@/styles'
import { HomeScreenProps, Task } from '@/models'
import { ActivityIndicator } from 'react-native'
import dayjs from 'dayjs'

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const user = auth().currentUser
  const [isLoading, setIsLoading] = useState(true)
  const [taskList, setTaskList] = useState<Task[]>([])

  useEffect(() => {
    const fetchTaskListAPI = async () => {
      setIsLoading(true)
      await firestore()
        .collection('tasks')
        .orderBy('dueDate')
        .limitToLast(3)
        .onSnapshot((snap) => {
          if (snap.empty) return

          const items: Task[] = []
          snap.forEach((item: any) =>
            items.push({
              id: item.id,
              ...item.data()
            })
          )

          setTaskList(items)
        })
      setIsLoading(false)
    }

    fetchTaskListAPI()
  }, [])

  return (
    <View style={styles.flex1}>
      <Container isScroll>
        <Section>
          <Row justify="space-between">
            <Element4 size={24} color={COLORS.desc} />
            <Notification size={24} color={COLORS.desc} />
          </Row>
        </Section>

        <Section>
          <Row justify="space-between">
            <View>
              <AppText text={`Hi, ${user?.email}`} />
              <Title text="Be Productive today" />
            </View>

            <TouchableOpacity onPress={() => auth().signOut()}>
              <Logout size={20} color={COLORS.error} />
            </TouchableOpacity>
          </Row>
        </Section>

        <Section>
          <Row styles={[globalStyles.inputContainer]} onPress={() => {}}>
            <AppText color="#696B6F" text="Search tasks" />
            <SearchNormal1 size={20} color={COLORS.desc} />
          </Row>
        </Section>

        <Section>
          <Card>
            <Row>
              <View style={styles.flex1}>
                <Title text="Task progress" />
                <AppText text="30/40 tasks done" />
                <Space height={12} />

                <Row justify="flex-start">
                  <Tag text="March 22" onPress={() => {}} />
                </Row>
              </View>

              <View>
                <Circular value={80} />
              </View>
            </Row>
          </Card>
        </Section>

        <Section>
          {isLoading ? (
            <ActivityIndicator />
          ) : taskList.length > 0 ? (
            <Row styles={{ alignItems: 'flex-start' }}>
              <View style={styles.flex1}>
                {taskList[0] && (
                  <CardImage
                    onPress={() =>
                      navigation.navigate(SCREENS.TASK_DETAILS_SCREEN, {
                        taskId: taskList[0].id,
                        color: 'rgba(113, 77, 217, 0.9)'
                      })
                    }
                  >
                    <TouchableOpacity style={globalStyles.iconContainer}>
                      <Edit2 size={20} color={COLORS.white1} />
                    </TouchableOpacity>
                    <Title text={taskList[0].title} />
                    <AppText text={taskList[0].description} size={13} numberOfLines={4} />

                    <View style={{ marginVertical: 25 }}>
                      <AvatarGroup />
                      {taskList[0]?.progress !== undefined && (
                        <ProgressBar
                          percent={`${Math.round(taskList[0]?.progress * 100)}%`}
                          color="#0AACFF"
                          size="large"
                        />
                      )}
                    </View>

                    <AppText
                      text={dayjs((taskList[0]?.dueDate as any)?.toDate()).format(
                        FORMAT_TYPES.DATE
                      )}
                      size={13}
                      color={COLORS.desc}
                    />
                  </CardImage>
                )}
              </View>

              <Space width={16} />

              <View style={styles.flex1}>
                {taskList[1] && (
                  <CardImage
                    color="rgba(33, 150, 243, 0.9)"
                    onPress={() =>
                      navigation.navigate(SCREENS.TASK_DETAILS_SCREEN, {
                        taskId: taskList[1].id,
                        color: 'rgba(33, 150, 243, 0.9)'
                      })
                    }
                  >
                    <TouchableOpacity style={globalStyles.iconContainer}>
                      <Edit2 size={20} color={COLORS.white1} />
                    </TouchableOpacity>
                    <Title text={taskList[1].title} size={18} />
                    <AppText text={taskList[1].description} size={13} />
                    {taskList[1]?.progress !== undefined && (
                      <ProgressBar
                        percent={`${Math.round(taskList[1]?.progress * 100)}%`}
                        color="#A2F068"
                        size="large"
                      />
                    )}
                  </CardImage>
                )}

                <Space height={16} />

                {taskList[2] && (
                  <CardImage
                    color="rgba(18, 181, 22, 0.9)"
                    onPress={() =>
                      navigation.navigate(SCREENS.TASK_DETAILS_SCREEN, {
                        taskId: taskList[2].id,
                        color: 'rgba(18, 181, 22, 0.9)'
                      })
                    }
                  >
                    <TouchableOpacity style={globalStyles.iconContainer}>
                      <Edit2 size={20} color={COLORS.white1} />
                    </TouchableOpacity>
                    <Title text={taskList[2].title} size={18} />
                    <AppText text={taskList[2].description} size={13} />
                    {taskList[2]?.progress !== undefined && (
                      <ProgressBar
                        percent={`${Math.round(taskList[2]?.progress * 100)}%`}
                        color="rgba(113, 77, 217, 0.9)"
                        size="large"
                      />
                    )}
                  </CardImage>
                )}
              </View>
            </Row>
          ) : (
            <AppText text="Empty task" />
          )}
        </Section>

        <Section>
          <AppText text="Urgent tasks" flex={1} font={FONT_FAMILIES.bold} size={21} />
          <Card>
            <Row>
              <Circular value={40} radius={36} />
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 12 }}>
                <AppText text="Title of task" />
              </View>
            </Row>
          </Card>
        </Section>
      </Container>

      <View style={styles.buttonContainer}>
        <AppButton
          text="Add new task"
          onPress={() => navigation.navigate(SCREENS.ADD_EDIT_TASK_SCREEN)}
          suffix={<Add size={22} color={COLORS.white1} />}
          styles={styles.button}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#3618e0',
    width: '80%'
  }
})
