import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

import { User } from '@/models'

export function useUserList() {
  const [userList, setUserList] = useState<User[]>([])

  useEffect(() => {
    const fetchUserListAPI = async () => {
      try {
        const snap = await firestore().collection('users').get()

        if (snap.empty) {
          return
        }

        const users: any[] = []

        snap.forEach((item) => {
          users.push({
            ...item.data(),
            id: item.id
          })
        })

        setUserList(users || [])
      } catch (error) {
        console.log('Failed to fetch users', error)
      }
    }

    fetchUserListAPI()
  }, [])

  return { data: userList }
}
