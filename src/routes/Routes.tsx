import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '@/screens/home'
import { AddEditTaskScreen } from '@/screens/tasks'
import { SCREENS } from '@/constants'
import { RootStackParamList } from '@/models'

export function Routes() {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={SCREENS.ADD_EDIT_TASK_SCREEN} component={AddEditTaskScreen} />
    </Stack.Navigator>
  )
}
