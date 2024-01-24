import { ArrowLeft2 } from 'iconsax-react-native'
import React, { ReactNode } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { COLORS, FONT_FAMILIES } from '@/constants'
import { globalStyles } from '@/styles'
import { AppText } from './AppText'
import { Row } from './Row'

interface ContainerProps {
  title?: string
  back?: boolean
  right?: ReactNode
  children: ReactNode
}

export const Container = ({ back, title, children }: ContainerProps) => {
  const navigation = useNavigation()

  return (
    <View style={[globalStyles.container]}>
      <Row styles={styles.header}>
        {back && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={COLORS.text} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          {title && (
            <AppText
              flex={0}
              font={FONT_FAMILIES.bold}
              size={16}
              text={title}
              styles={{ textAlign: 'center', marginLeft: back ? -24 : 0 }}
            />
          )}
        </View>
      </Row>

      <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: { flex: 1, zIndex: -1 }
})
