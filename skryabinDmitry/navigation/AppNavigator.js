import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'


import AddTaskNavigator from './AddTaskNavigator'


import MainScreen from '../screens/MainScreen'
import TaskScreen from '../screens/TaskScreen'
import ProfileScreen from '../screens/ProfileScreen'


const _MainNavigator = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      title: 'Главная'
    }
  }
})
const _ProfileNavigator = createStackNavigator({
  Main: {
    screen: ProfileScreen,
    navigationOptions: {
      title: 'Профиль'
    }
  }
})


const AppNavigator = createBottomTabNavigator({
  Main:{
    screen: _MainNavigator,
    navigationOptions: {
      title: 'Главная'
    }
  },
  Task: {
    screen: AddTaskNavigator,
    navigationOptions: {
      title: 'Задачи'
    }
  },
  Profile:{
    screen: _ProfileNavigator,
    navigationOptions: {
      title: 'Профиль'
    }
  }
})

export default createAppContainer(AppNavigator)
