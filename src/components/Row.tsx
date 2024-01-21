import { globalStyles } from '@/styles'
import React, { ReactNode } from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'

interface RowProps {
  children: ReactNode
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  styles?: StyleProp<ViewStyle>
  onPress?: () => void
}

export const Row = ({ children, justify = 'center', styles, onPress }: RowProps) => {
  const localStyle = [
    globalStyles.row,
    {
      justifyContent: justify
    },
    styles
  ]

  if (onPress) {
    return (
      <TouchableOpacity style={localStyle} onPress={onPress}>
        {children}
      </TouchableOpacity>
    )
  }

  return <View style={localStyle}>{children}</View>
}
