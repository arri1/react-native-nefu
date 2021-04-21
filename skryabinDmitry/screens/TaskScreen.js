import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'


import Task from '../components/Task'

const TaskScreen = ({ navigation, route }) => {


  const [tasks, setTasks] = useState([])
  const [compleateTask, setcompleateTask] = useState([])

  const addTask = (taskname) => {
    setTasks(prev => [
      {
        id: Date.now().toString(),
        taskname: taskname
      },
      ...prev
    ])
  }

  const compleatedTask = id => {
    setcompleateTask(prev => [
      {
        id: Date.now().toString(),
        taskname: tasks.filter((item) => item.id == id).[0].taskname
      },
      ...prev
    ])
    setTasks(prev => prev.filter(item => item.id !== id))
    console.log(compleateTask)
  }

  useEffect(() => {
    if (route.params?.taskname) {
      addTask(route.params.taskname)
    }
  }, [route.params?.taskname]);

  const goToAddTask = () => {
    navigation.navigate('AddTaskScreen')
  }
  if (tasks.length > 0 || compleateTask.length > 0){
    return(
      <SafeAreaView style = { styles.container }>
        <ScrollView>
          <View>
            <Text style = { styles.description }>
              Предстоит
            </Text>
            <FlatList
              keyExtractor = { item => item.id.toString() }
              data = {tasks}
              renderItem = { ({ item }) => <Task task={item} onCompleate={compleatedTask}/> }
            />
          </View>
          <View>
          <Text style = { styles.description }>
              Выполнено
            </Text>
            <FlatList
              keyExtractor = { item => item.id.toString() }
              data = {compleateTask}
              renderItem = { ({ item }) => <Task task={item}/> }
            />
          </View>
        </ScrollView>
  
  
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
        
      </SafeAreaView>
    )
  }
  else {
    return (
      <SafeAreaView style = { styles.empty_tasks }>
        <Text>
          У вас нет задач!
        </Text>

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
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  empty_tasks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container:{
    marginVertical:20,
    marginHorizontal: 20,
    flex: 1,
  },
  fixedView:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  description: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#374e8c',
    marginBottom: 10
  },
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#374e8c'
  },
  text: {
    fontSize: 25,
    color: '#fff'
  }
})

export default TaskScreen
