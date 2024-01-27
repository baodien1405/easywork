import { COLORS, FONT_FAMILIES } from '@/constants'
import { Platform, StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingTop: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    fontFamily: FONT_FAMILIES.regular,
    color: COLORS.text
  },
  inputContainer: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    paddingHorizontal: Platform.OS === 'ios' ? 12 : 10,
    paddingVertical: 12
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 20
  },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 6 : 4,
    backgroundColor: COLORS.blue,
    borderRadius: 100
  },
  card: {
    borderRadius: 12
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  flex1: {
    flex: 1
  }
})
