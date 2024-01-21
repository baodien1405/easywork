import React from 'react'

import { COLORS, FONT_FAMILIES } from '@/constants'
import { AppText } from './AppText'

interface TitleProps {
  text: string
  size?: number
  font?: string
  color?: string
}

export function Title({
  text,
  size = 20,
  color = COLORS.text,
  font = FONT_FAMILIES.semibold
}: TitleProps) {
  return <AppText text={text} size={size} color={color} font={font} />
}
