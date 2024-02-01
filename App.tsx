import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'

import { COLORS } from '@/constants'
import { Routes } from '@/routes'

function App() {
  return (
    <>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={COLORS.bgColor} />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  )
}

export default App
