import React, { ReactNode } from 'react'
import { ActivityIndicator, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'

import { AppText, Row } from '@/components'
import { COLORS } from '@/constants'

interface AppButtonProps {
  text: string
  icon?: ReactNode
  color?: string
  loading?: boolean
  styles?: StyleProp<ViewStyle>
  prefix?: ReactNode
  suffix?: ReactNode
  onPress: () => void
}

export function AppButton({
  text,
  onPress,
  color,
  loading,
  styles,
  prefix,
  suffix
}: AppButtonProps) {
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
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Row>
          {prefix && <View>{prefix}</View>}
          <AppText text={text} flex={0} size={16} />
          {suffix && <View>{suffix}</View>}
        </Row>
      )}
    </TouchableOpacity>
  )
}
