import { createStackNavigator } from 'react-navigation-stack'

import TaskScreen from '../screens/TaskScreen'
import AddTaskScreen from '../screens/AddTaskScreen'


const AddTaskNavigator = createStackNavigator({
    Task: {
      screen: TaskScreen,
      navigationOptions: {
        title: 'Задачи'
      }
    },
    AddTask: {
        screen: AddTaskScreen,
        navigationOptions: {
            title: 'Добавление задачи'
        }
    }
  })

export default AddTaskNavigator