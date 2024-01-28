import React from 'react'
import { StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'

import { AppText, Container, LoginForm, Row, Section, Space, Title } from '@/components'
import { FONT_FAMILIES, SCREENS } from '@/constants'
import { LoginPayload, LoginScreenProps } from '@/models'

export function LoginScreen({ navigation }: LoginScreenProps) {
  const handleLogin = async (payload: LoginPayload) => {
    try {
      await auth().signInWithEmailAndPassword(payload.email, payload.password)
    } catch (error) {}
  }

  return (
    <Container>
      <Section styles={styles.section}>
        <Title text="Login" size={32} font={FONT_FAMILIES.bold} styles={styles.title} />

        <LoginForm onSubmit={handleLogin} />

        <Space height={20} />

        <Row>
          <AppText text="You don't have an account?" styles={styles.text} />
          <Space width={2} />
          <AppText
            text="Create an account"
            styles={styles.link}
            onPress={() => navigation.navigate(SCREENS.SIGN_UP_SCREEN)}
          />
        </Row>
      </Section>
    </Container>
  )
}

const styles = StyleSheet.create({
  section: {
    justifyContent: 'center',
    flex: 1
  },
  title: {
    textTransform: 'uppercase',
    flex: 0,
    textAlign: 'center',
    marginBottom: 20
  },
  text: {
    flex: 0
  },
  link: {
    flex: 0,
    color: 'coral'
  }
})
