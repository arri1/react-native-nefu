import React, {useEffect, useState} from 'react'
import {SafeAreaView, ScrollView} from 'react-native'
import axios from 'axios'
import TodoListItem from '../components/todoListItem'

const TodoList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(({data}) => {
            setData(data)
        })
    }, [])
    return (
        <SafeAreaView>
            <ScrollView style={{
                    marginTop:25
                }}>
                {
                    data.map(item => {
                        return (
                            <TodoListItem
                                title={item.title}
                                body={item.body}
                                key={item.id}
                                author_key={item.userId}
                            />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}
export default TodoList
