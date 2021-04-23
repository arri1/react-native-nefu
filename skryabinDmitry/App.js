import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'


import axios from 'axios'


import ToDo from './components/toDo'

const App = () => {
  const url = 'https://jsonplaceholder.typicode.com/posts'
  const [data, setData] = useState([])
  useEffect(() => {
      axios.get(url).then(({response}) => { 
        const posts = response.data
        this.setState({ posts })
      }).catch(error => console.log(error));
  }, [])
  console.log(data)

  return (
      <SafeAreaView style = { styles.container }>
        <ScrollView>{
          data.map(item => {
              return (
                  <ToDo
                      title={item.title}
                      key={item.id}
                  />
              )
            })
          }
          </ScrollView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 50,
        marginVertical: 50,
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})

export default App;
