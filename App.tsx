import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { COLORS } from '@/constants'
import { Routes } from '@/routes'

function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgColor }}>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={COLORS.bgColor} />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App
