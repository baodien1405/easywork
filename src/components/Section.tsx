import { globalStyles } from '@/styles'
import React, { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

interface SectionProps {
  children: ReactNode
  styles?: StyleProp<ViewStyle>
}

export function Section({ children, styles }: SectionProps) {
  return <View style={[globalStyles.section, styles]}>{children}</View>
}
