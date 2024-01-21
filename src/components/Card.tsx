import { globalStyles } from '@/styles'
import React, { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

interface CardProps {
  styles?: StyleProp<ViewStyle>
  children: ReactNode
}

export function Card({ styles, children }: CardProps) {
  return <View style={[globalStyles.inputContainer, { padding: 12 }, styles]}>{children}</View>
}
