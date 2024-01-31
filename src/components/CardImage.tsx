import React, { ReactNode } from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native'

import { IMAGES } from '@/assets/images'
import { globalStyles } from '@/styles'

interface CardImageProps {
  color?: string
  children: ReactNode
  onPress?: () => void
}

export function CardImage({
  color = 'rgba(113, 77, 217, 0.9)',
  children,
  onPress
}: CardImageProps) {
  return (
    <TouchableOpacity onPress={onPress}>
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
    </TouchableOpacity>
  )
}
