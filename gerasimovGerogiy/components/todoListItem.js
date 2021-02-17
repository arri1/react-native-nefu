import React from 'react'
import {Text, View} from 'react-native'

const TodoListItem = ({title, body}) => {
    return (
        <View
            style={
                {
                    marginBottom: 20,
                    borderRadius: 30,
                    backgroundColor: '#d0cbcb',
                    padding:20
                }}
        >
            <Text
                style={{fontSize:24}}
            >
                {title}
            </Text>
            <Text
                style={{marginTop:8}}
            >
                {body}
            </Text>
        </View>
    )
}

export default TodoListItem
