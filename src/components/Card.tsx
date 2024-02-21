import { COLORS } from '@/constants'
import { globalStyles } from '@/styles'
import React, { ReactNode } from 'react'
import { StyleProp, View, ViewStyle, TouchableOpacity } from 'react-native'

interface CardProps {
  styles?: StyleProp<ViewStyle>
  bgColor?: string
  children: ReactNode
  onPress?: () => void
}

export function Card({ styles, bgColor = COLORS.gray, children, onPress }: CardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        style={[globalStyles.inputContainer, { padding: 12, backgroundColor: bgColor }, styles]}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <View style={[globalStyles.inputContainer, { padding: 12, backgroundColor: bgColor }, styles]}>
      {children}
    </View>
  )
}
