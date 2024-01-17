import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FONTS } from './src/constants'

function App(): React.JSX.Element {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>Easywork</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'coral'
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    color: 'white'
  }
})

export default App
