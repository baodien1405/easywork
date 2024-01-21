import { Element4, Notification, SearchNormal1 } from 'iconsax-react-native'
import React from 'react'
import { View } from 'react-native'

import { AppText, Card, Circular, Container, Row, Section, Space, Tag, Title } from '@/components'
import { COLORS } from '@/constants'
import { globalStyles } from '@/styles'

export const HomeScreen = () => {
  return (
    <Container>
      <Section>
        <Row justify="space-between">
          <Element4 size={24} color={COLORS.desc} />
          <Notification size={24} color={COLORS.desc} />
        </Row>
      </Section>

      <Section>
        <AppText text="Hi, Jason" />
        <Title text="Be Productive today" />
      </Section>

      <Section>
        <Row styles={[globalStyles.inputContainer]} onPress={() => {}}>
          <AppText color="#696B6F" text="Search tasks" />
          <SearchNormal1 size={20} color={COLORS.desc} />
        </Row>
      </Section>

      <Section>
        <Card>
          <Row>
            <View style={{ flex: 1 }}>
              <Title text="Task progress" />
              <AppText text="30/40 tasks done" />
              <Space height={12} />

              <Row justify="flex-start">
                <Tag text="March 22" onPress={() => console.log('Say hi!!!')} />
              </Row>
            </View>

            <View>
              <Circular value={80} />
            </View>
          </Row>
        </Card>
      </Section>
    </Container>
  )
}
