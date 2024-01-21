import React, { ReactNode } from 'react'
import { ScrollView } from 'react-native'
import { globalStyles } from '@/styles'

interface ContainerProps {
  title?: string
  back?: boolean
  right?: ReactNode
  children: ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return <ScrollView style={[globalStyles.container]}>{children}</ScrollView>
}
