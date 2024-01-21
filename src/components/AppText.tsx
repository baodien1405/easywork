import { COLORS, FONT_FAMILIES } from '@/constants'
import { globalStyles } from '@/styles'
import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

interface AppTextProps {
  text: string
  size?: number
  font?: string
  color?: string
  flex?: number
  styles?: StyleProp<TextStyle>
}

export function AppText({
  text,
  size = 14,
  font = FONT_FAMILIES.regular,
  color = COLORS.desc,
  flex = 1,
  styles
}: AppTextProps) {
  return (
    <Text
      style={[
        globalStyles.text,
        {
          flex: flex,
          fontFamily: font,
          fontSize: size,
          color: color
        },
        styles
      ]}
    >
      {text}
    </Text>
  )
}
