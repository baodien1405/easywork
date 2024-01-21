import React from 'react'
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { AppText } from './AppText'
import { globalStyles } from '@/styles'
import { COLORS } from '@/constants'

interface TagProps {
  text: string
  color?: string
  tagStyles?: StyleProp<ViewStyle>
  textStyles?: StyleProp<TextStyle>
  onPress?: () => void
}

export function Tag({ text, color = COLORS.blue, textStyles, tagStyles, onPress }: TagProps) {
  return (
    <TouchableOpacity
      style={[globalStyles.tag, tagStyles, { backgroundColor: color }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <AppText styles={textStyles} text={text} />
    </TouchableOpacity>
  )
}
