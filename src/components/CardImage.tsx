import React, { ReactNode } from 'react'
import { ImageBackground, View } from 'react-native'

import { IMAGES } from '@/assets/images'
import { globalStyles } from '@/styles'

interface CardImageProps {
  color?: string
  children: ReactNode
}

export function CardImage({ color = 'rgba(113, 77, 217, 0.9)', children }: CardImageProps) {
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 12 }}
      style={[globalStyles.card]}
      source={IMAGES.cardBackground}
    >
      <View
        style={{
          borderRadius: 12,
          backgroundColor: color,
          flex: 1,
          padding: 12
        }}
      >
        {children}
      </View>
    </ImageBackground>
  )
}
