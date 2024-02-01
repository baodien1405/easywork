export type RootStackParamList = {
  LoginScreen: undefined
  SignUpScreen: undefined
  HomeScreen: undefined
  AddEditTaskScreen: { taskId?: string } | undefined
  TaskDetailsScreen: { taskId?: string; color?: string }
}
