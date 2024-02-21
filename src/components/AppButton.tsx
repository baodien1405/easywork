import React, { ReactNode } from 'react'
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

import { AppText, Row } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'

interface AppButtonProps {
  text: string
  icon?: ReactNode
  color?: string
  loading?: boolean
  styles?: StyleProp<ViewStyle>
  textStyles?: StyleProp<TextStyle>
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
  suffix,
  textStyles
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
          <AppText
            text={text}
            flex={0}
            size={16}
            font={FONT_FAMILIES.semibold}
            styles={textStyles}
          />
          {suffix && <View>{suffix}</View>}
        </Row>
      )}
    </TouchableOpacity>
  )
}
