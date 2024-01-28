import React from 'react'
import { StyleSheet } from 'react-native'

import { AppText, Container, Row, Section, SignUpForm, Space, Title } from '@/components'
import { FONT_FAMILIES, SCREENS } from '@/constants'
import { SignUpScreenProps } from '@/models'

export function SignUpScreen({ navigation }: SignUpScreenProps) {
  return (
    <Container>
      <Section styles={styles.section}>
        <Title text="Sign up" size={32} font={FONT_FAMILIES.bold} styles={styles.title} />

        <SignUpForm />

        <Space height={20} />

        <Row>
          <AppText text="You have an already account?" styles={styles.text} />
          <Space width={2} />
          <AppText
            text="Login"
            styles={styles.link}
            onPress={() => navigation.navigate(SCREENS.LOGIN_SCREEN)}
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
