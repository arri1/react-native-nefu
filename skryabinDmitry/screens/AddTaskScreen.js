import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const AddTaskScreen = ({ navigation }) => {
  
  const [value, setValue] = useState('')

  const pressHandler = () => {
    console.log(value)
    navigation.navigate({ name: 'TaskScreen', params: { taskname: value }, })
    setValue('')
  }

  return (
    <SafeAreaView style = { styles.container }>
    <View>
      <Text>
        Описание
      </Text>
      <TextInput
        style = { styles.input }
        onChangeText = { setValue }
        value = { value }
        placeholder = 'Название задачи'
      />
    </View>
    <View>
      <TouchableOpacity 
      style = { styles.submit }
      onPress = {pressHandler}
      >
        <Text style = {{ color: '#fff', fontSize: 15 }}>
          Добавить
        </Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    marginHorizontal: 50,
    marginVertical: 50,
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#374e8c',
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  submit: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 50,
    backgroundColor: '#374e8c',
    borderRadius: 10,
    alignSelf: 'stretch',
  }
})

export default AddTaskScreen
