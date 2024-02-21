import { COLORS, FONT_FAMILIES } from '@/constants'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'

interface CircularProps {
  color?: string
  value: number
  maxValue?: number
  radius?: number
}

export function Circular({ color = COLORS.blue, radius = 46, value }: CircularProps) {
  return (
    <CircularProgress
      value={value}
      maxValue={100}
      title={`${value}%`}
      radius={radius}
      showProgressValue={false}
      activeStrokeColor={color}
      inActiveStrokeColor="#3C444A"
      titleColor={COLORS.text}
      activeStrokeWidth={14}
      inActiveStrokeWidth={14}
      titleFontSize={20}
      titleStyle={{
        fontFamily: FONT_FAMILIES.medium,
        fontSize: 18
      }}
    />
  )
}
