import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


const TaskScreen = ({ navigation }) => {
  console.log("Страница тасков")
  const goToAddTask = () => {
    navigation.navigate('AddTaskScreen')
  }

  return(
    <View style = { styles.container }>
    <View>
      <Text>Тут будутsdsd таски</Text>
    </View>
    <View style = { styles.fixedView }>
      <TouchableOpacity 
        style = { styles.fab }
        onPress = { goToAddTask }
        >
        <Text style ={ styles.text }>
          +
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  )

  
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fixedView:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5cf4f3'
  },
  text: {
    fontSize: 25,
    color: '#fff'
  }
})

export default TaskScreen
