import { ArrowLeft2 } from 'iconsax-react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
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
  isScroll?: boolean
}

export const Container = ({ back, title, children, isScroll }: ContainerProps) => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgColor }}>
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

        {isScroll ? (
          <ScrollView style={globalStyles.flex1}>{children}</ScrollView>
        ) : (
          <View style={globalStyles.flex1}>{children}</View>
        )}
      </View>
    </SafeAreaView>
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
