import { Add, Edit2, Element4, Logout, Notification, SearchNormal1 } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from 'react-native'
import dayjs from 'dayjs'

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

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const user = auth().currentUser
  const [isLoading, setIsLoading] = useState(true)
  const [taskList, setTaskList] = useState<Task[]>([])
  const urgentTaskList = taskList.filter((task) => task.isUrgent)
  const completedTaskList = taskList.filter((task) => task.progress === 1)

  useEffect(() => {
    const fetchTaskListAPI = async () => {
      setIsLoading(true)
      await firestore()
        .collection('tasks')
        .where('uids', 'array-contains', user?.uid)
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
  }, [user?.uid])

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
          <Row
            styles={[globalStyles.inputContainer]}
            onPress={() => navigation.navigate(SCREENS.TASK_LIST_SCREEN)}
          >
            <AppText color="#696B6F" text="Search tasks" />
            <SearchNormal1 size={20} color={COLORS.desc} />
          </Row>
        </Section>

        <Section>
          <Card>
            <Row onPress={() => navigation.navigate(SCREENS.TASK_LIST_SCREEN)}>
              <View style={styles.flex1}>
                <Title text="Task progress" />
                <AppText text={`${completedTaskList.length}/${taskList.length} tasks done`} />
                <Space height={12} />

                <Row justify="flex-start">
                  <Tag text={dayjs(new Date()).format('MMM DD')} onPress={() => {}} />
                </Row>
              </View>

              <View>
                <Circular value={Math.floor((completedTaskList.length / taskList.length) * 100)} />
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
                    <Title text={taskList[0].title} size={18} numberOfLines={2} />
                    <AppText text={taskList[0].description} size={13} numberOfLines={3} />

                    <View style={{ marginVertical: 25 }}>
                      <AvatarGroup uids={taskList[0].uids} />
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

                    <Title text={taskList[1].title} size={18} numberOfLines={2} />

                    <AppText text={taskList[1].description} size={13} numberOfLines={3} />

                    <View style={{ marginVertical: 25 }}>
                      <AvatarGroup uids={taskList[1].uids} />

                      {taskList[1]?.progress !== undefined && (
                        <ProgressBar
                          percent={`${Math.round(taskList[1]?.progress * 100)}%`}
                          color="#A2F068"
                          size="large"
                        />
                      )}
                    </View>
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

                    <Title text={taskList[2].title} size={18} numberOfLines={2} />
                    <AppText text={taskList[2].description} size={13} numberOfLines={3} />

                    <View style={{ marginVertical: 25 }}>
                      <AvatarGroup uids={taskList[2].uids} />
                      {taskList[2]?.progress !== undefined && (
                        <ProgressBar
                          percent={`${Math.round(taskList[2]?.progress * 100)}%`}
                          color="rgba(113, 77, 217, 0.9)"
                          size="large"
                        />
                      )}
                    </View>
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
          {urgentTaskList.map((task) => (
            <Card
              key={task.id}
              styles={{ marginTop: 12 }}
              onPress={() => navigation.navigate(SCREENS.TASK_DETAILS_SCREEN, { taskId: task.id })}
            >
              <Row>
                <Circular value={task.progress ? task.progress * 100 : 0} radius={40} />
                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 12 }}>
                  <AppText text={task.title} />
                </View>
              </Row>
            </Card>
          ))}
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
