import React from 'react'
import { SafeAreaView } from 'react-native'

import { HomeScreen } from '@/screens/home'

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar translucent barStyle={'light-content'} backgroundColor="transparent" /> */}
      <HomeScreen />
    </SafeAreaView>
  )
}

export default App
