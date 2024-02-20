import React from 'react'
import { StyleSheet, View } from 'react-native'

import { COLORS, FONT_FAMILIES } from '@/constants'
import { AppText, Row, Avatar } from '@/components'

interface AvatarGroupProps {
  uids: string[]
}

export function AvatarGroup({ uids }: AvatarGroupProps) {
  return (
    <Row styles={styles.container}>
      {uids.map((item, index) => index < 3 && <Avatar uid={item} index={index} key={item} />)}

      {uids.length > 3 && (
        <View style={[styles.avatar, styles.avatarMore]}>
          <AppText
            flex={0}
            size={12}
            styles={styles.textMore}
            font={FONT_FAMILIES.semibold}
            text={`+${uids.length - 3 > 9 ? 9 : uids.length - 3}`}
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
