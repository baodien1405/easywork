import { StyleSheet, Text, View, Image } from 'react-native'
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import React from 'react'

import { User } from '@/models'
import { globalStyles } from '@/styles'
import { COLORS, FONT_FAMILIES } from '@/constants'

export interface AvatarProps {
  uid: string
  index?: number
}

export function Avatar({ uid, index }: AvatarProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    firestore()
      .doc(`users/${uid}`)
      .get()
      .then((snap: any) => {
        if (snap.exists) {
          setUser({
            uid,
            ...snap.data()
          })
        }
      })
      .catch((error) => console.log(error))
  }, [uid])

  if (!user) return null

  if (user?.avatarUrl) {
    return (
      <Image
        source={{ uri: user?.avatarUrl }}
        key={`image${uid}`}
        style={[styles.avatar, { marginLeft: index && index > 0 ? -10 : 0 }]}
      />
    )
  }

  return (
    <View
      key={`image${uid}`}
      style={[
        styles.avatar,
        {
          marginLeft: index && index > 0 ? -10 : 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.gray2
        }
      ]}
    >
      <Text style={[globalStyles.text, { fontFamily: FONT_FAMILIES.bold, fontSize: 14 }]}>
        {user.displayName.charAt(0).toUpperCase()}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.white1
  }
})
