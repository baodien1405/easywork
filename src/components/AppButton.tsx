import React, { ReactNode } from 'react'
import { ActivityIndicator, StyleProp, TouchableOpacity, ViewStyle } from 'react-native'

import { AppText } from '@/components'
import { COLORS } from '@/constants'

interface AppButtonProps {
  text: string
  icon?: ReactNode
  color?: string
  loading?: boolean
  styles?: StyleProp<ViewStyle>
  onPress: () => void
}

export function AppButton({ text, onPress, color, loading, styles }: AppButtonProps) {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={[
        {
          backgroundColor: color ? color : loading ? COLORS.gray2 : COLORS.blue,
          padding: 16,
          width: '100%',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center'
        },
        styles
      ]}
    >
      {loading ? <ActivityIndicator /> : <AppText text={text} flex={0} size={16} />}
    </TouchableOpacity>
  )
}
