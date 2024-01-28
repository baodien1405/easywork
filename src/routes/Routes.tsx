import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'

import { HomeScreen } from '@/screens/home'
import { AddEditTaskScreen } from '@/screens/tasks'
import { SCREENS } from '@/constants'
import { RootStackParamList } from '@/models'
import { LoginScreen, SignUpScreen } from '@/screens/auth'

export function Routes() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    })
  }, [isLogin])

  const AuthRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={SCREENS.SIGN_UP_SCREEN} component={SignUpScreen} />
    </Stack.Navigator>
  )

  const MainRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={SCREENS.ADD_EDIT_TASK_SCREEN} component={AddEditTaskScreen} />
    </Stack.Navigator>
  )

  return isLogin ? MainRouter : AuthRouter
}
