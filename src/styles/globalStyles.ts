import { COLORS, FONT_FAMILIES } from '@/constants'
import { Platform, StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 52 : 42
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
    paddingVertical: Platform.OS === 'ios' ? 12 : 10
  },
  section: {
    marginBottom: 16
  },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 6 : 4,
    backgroundColor: COLORS.blue,
    borderRadius: 100
  }
})
