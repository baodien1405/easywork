import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { COLORS, FONT_FAMILIES } from '@/constants'
import { AppText } from './AppText'
import { Row } from './Row'

export function AvatarGroup() {
  const uidLength = 10
  const imageUrl =
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww'

  return (
    <Row styles={styles.container}>
      {Array.from({ length: uidLength }).map(
        (item, index) =>
          index < 3 && (
            <Image
              source={{ uri: imageUrl }}
              key={`image${index}`}
              style={[styles.avatar, { marginLeft: index > 0 ? -10 : 0 }]}
            />
          )
      )}

      {uidLength > 5 && (
        <View style={[styles.avatar, styles.avatarMore]}>
          <AppText
            flex={0}
            size={12}
            styles={styles.textMore}
            font={FONT_FAMILIES.semibold}
            text={`+${uidLength - 3 > 9 ? 9 : uidLength - 3}`}
          />
        </View>
      )}
    </Row>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.white1
  },
  avatarMore: {
    backgroundColor: 'coral',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: -10
  },
  textMore: {
    lineHeight: 19
  }
})
