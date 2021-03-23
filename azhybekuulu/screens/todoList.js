import React, {useEffect, useState} from 'react'
import {SafeAreaView, ScrollView,StyleSheet} from 'react-native'
import axios from 'axios'
import TodoListItem from '../components/todoListItem'

const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: "#7F39FB",
      color: "#fff",
      width: "100%",
      height: 30
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start"
    },
    todo: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    textbox: {
      borderWidth: 1,
      borderColor: "#7F39FB",
      borderRadius: 8,
      padding: 10,
      margin: 10,
      width: "80%"
    }
});
const TodoList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(({data}) => {
            setData(data)
        })
    }, [])
    return (
        <SafeAreaView>
            <ScrollView>
                {
                    data.map(item => {
                        return (
                            <TodoListItem
                                title={item.title}
                                body={item.body}
                                key={item.id}
                            />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}
export default TodoList
