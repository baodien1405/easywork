import React from 'react'
import { Text, View } from 'react-native'

import { Row, Section, AppText, Container, Title, Card } from '@/components'
import { globalStyles } from '@/styles'

export const HomeScreen = () => {
  return (
    <Container>
      <Section>
        <Row justify="space-between">
          <AppText text="HomeScreen" />
          <AppText text="HomeScreen" />
        </Row>
      </Section>

      <Section>
        <AppText text="Hi, Jason" />
        <Title text="Be Productive today" />
      </Section>

      <Section>
        <Row styles={[globalStyles.inputContainer]} onPress={() => {}}>
          <AppText text="Search" />
          <Text>S</Text>
        </Row>
      </Section>

      <Section>
        <Card>
          <Row>
            <View style={{ flex: 1 }}>
              <Title text="Task progress" />
              <AppText text="30/40 tasks done" />
              <AppText text="tag" />
            </View>

            <View>
              <AppText text="CircleChar" />
            </View>
          </Row>
        </Card>
      </Section>
    </Container>
  )
}
