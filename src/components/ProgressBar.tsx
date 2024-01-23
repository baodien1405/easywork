import React from 'react'
import { DimensionValue, StyleSheet, View } from 'react-native'

import { AppText } from './AppText'
import { Row } from './Row'
import { FONT_FAMILIES } from '@/constants'

interface ProgressBarProps {
  color?: string
  size?: 'small' | 'large' | 'default'
  percent: DimensionValue
}

export function ProgressBar({ color = 'coral', size = 'default', percent }: ProgressBarProps) {
  const sizeProgress = {
    small: 6,
    large: 10,
    default: 8
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: sizeProgress[size],
          width: '100%',
          borderRadius: 100,
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        <View
          style={{
            height: sizeProgress[size],
            width: percent,
            backgroundColor: color,
            borderRadius: 100
          }}
        ></View>
      </View>

      <Row justify="space-between" styles={{ marginTop: 4 }}>
        <AppText text="Progress" size={12} />
        <AppText text={`${percent}`} size={12} flex={0} font={FONT_FAMILIES.bold} />
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 16
  }
})
