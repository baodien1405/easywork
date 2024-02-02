import { COLORS } from '@/constants'
import { globalStyles } from '@/styles'
import React, { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

interface CardProps {
  styles?: StyleProp<ViewStyle>
  bgColor?: string
  children: ReactNode
}

export function Card({ styles, bgColor = COLORS.bgColor, children }: CardProps) {
  return (
    <View style={[globalStyles.inputContainer, { padding: 12, backgroundColor: bgColor }, styles]}>
      {children}
    </View>
  )
}
