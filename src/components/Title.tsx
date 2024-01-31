import React from 'react'

import { COLORS, FONT_FAMILIES } from '@/constants'
import { AppText } from './AppText'
import { StyleProp, TextStyle } from 'react-native'

interface TitleProps {
  text: string
  size?: number
  font?: string
  color?: string
  styles?: StyleProp<TextStyle>
  flex?: number
}

export function Title({
  text,
  size = 20,
  color = COLORS.text,
  font = FONT_FAMILIES.semibold,
  styles,
  flex = 0
}: TitleProps) {
  return <AppText text={text} size={size} color={color} font={font} styles={styles} flex={flex} />
}
