import { Add, Edit2, Element4, Logout, Notification, SearchNormal1 } from 'iconsax-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth'

import {
  AppText,
  AvatarGroup,
  Card,
  CardImage,
  Circular,
  Container,
  ProgressBar,
  Row,
  Section,
  Space,
  Tag,
  Title
} from '@/components'
import { COLORS, FONT_FAMILIES, SCREENS } from '@/constants'
import { globalStyles } from '@/styles'
import { HomeScreenProps } from '@/models'

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const user = auth().currentUser

  return (
    <View style={styles.flex1}>
      <Container isScroll>
        <Section>
          <Row justify="space-between">
            <Element4 size={24} color={COLORS.desc} />
            <Notification size={24} color={COLORS.desc} />
          </Row>
        </Section>

        <Section>
          <Row styles={{ justifyContent: 'space-between' }}>
            <View>
              <AppText text={`Hi, ${user?.email}`} />
              <Title text="Be Productive today" />
            </View>

            <TouchableOpacity onPress={() => auth().signOut()}>
              <Logout size={20} color={COLORS.error} />
            </TouchableOpacity>
          </Row>
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
              <View style={styles.flex1}>
                <Title text="Task progress" />
                <AppText text="30/40 tasks done" />
                <Space height={12} />

                <Row justify="flex-start">
                  <Tag text="March 22" onPress={() => {}} />
                </Row>
              </View>

              <View>
                <Circular value={80} />
              </View>
            </Row>
          </Card>
        </Section>

        <Section>
          <Row styles={{ alignItems: 'flex-start' }}>
            <View style={styles.flex1}>
              <CardImage>
                <TouchableOpacity style={globalStyles.iconContainer}>
                  <Edit2 size={20} color={COLORS.white1} />
                </TouchableOpacity>
                <Title text="UX Design" />
                <AppText text="Task management mobile app" size={13} />

                <View style={{ marginVertical: 25 }}>
                  <AvatarGroup />
                  <ProgressBar percent="80%" color="#0AACFF" size="large" />
                </View>

                <AppText text="Due, 2023 March 03" size={13} color={COLORS.desc} />
              </CardImage>
            </View>

            <Space width={16} />

            <View style={styles.flex1}>
              <CardImage color="rgba(33, 150, 243, 0.9)">
                <TouchableOpacity style={globalStyles.iconContainer}>
                  <Edit2 size={20} color={COLORS.white1} />
                </TouchableOpacity>
                <Title text="API Payment" size={18} />
                <ProgressBar percent="80%" color="#A2F068" />
              </CardImage>

              <Space height={16} />

              <CardImage color="rgba(18, 181, 22, 0.9)">
                <TouchableOpacity style={globalStyles.iconContainer}>
                  <Edit2 size={20} color={COLORS.white1} />
                </TouchableOpacity>
                <Title text="Update work" size={18} />
                <AppText text="Revision home page" size={13} />
              </CardImage>
            </View>
          </Row>
        </Section>

        <Section>
          <AppText text="Urgent tasks" flex={1} font={FONT_FAMILIES.bold} size={21} />
          <Card>
            <Row>
              <Circular value={40} radius={36} />
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 12 }}>
                <AppText text="Title of task" />
              </View>
            </Row>
          </Card>
        </Section>
      </Container>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[globalStyles.row, styles.button]}
          onPress={() => navigation.navigate(SCREENS.ADD_EDIT_TASK_SCREEN)}
        >
          <AppText text="Add new task" flex={0} />
          <Add size={22} color={COLORS.white1} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#3618e0',
    padding: 10,
    borderRadius: 12,
    width: '80%'
  }
})
