import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import { SearchNormal1 } from 'iconsax-react-native'

import { AppText, Container, Section, Title } from '@/components'
import { COLORS, SCREENS } from '@/constants'
import { Task, TaskListScreenProps } from '@/models'
import { globalStyles } from '@/styles'
import { InputField } from '@/components/FormFields'

export function TaskListScreen({ navigation }: TaskListScreenProps) {
  const user = auth().currentUser
  const [isLoading, setIsLoading] = useState(true)
  const [taskList, setTaskList] = useState<Task[]>([])
  const [searchText, setSearchText] = useState('')
  const { control } = useForm()

  const filteredTaskList = taskList.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  )

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

  if (isLoading) {
    return <ActivityIndicator />
  }

  const handleSearch = (text: string) => {
    setSearchText(text)
  }

  return (
    <Container back title="Task List">
      <Section>
        <InputField
          name="search"
          control={control}
          placeholder="Search"
          prefix={<SearchNormal1 size={20} color={COLORS.gray2} />}
          allowClear
          onChangeText={handleSearch}
        />
      </Section>

      <Section styles={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={globalStyles.flex1}
          data={filteredTaskList}
          ListEmptyComponent={
            <Section>
              <AppText text="Empty task" />
            </Section>
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={{ marginBottom: 24 }}
                onPress={() =>
                  navigation.navigate(SCREENS.TASK_DETAILS_SCREEN, { taskId: item.id })
                }
              >
                <Title text={item.title} numberOfLines={2} />
                <AppText text={item.description} numberOfLines={2} />
              </TouchableOpacity>
            )
          }}
        />
      </Section>
    </Container>
  )
}
