import React from 'react'
import {Text, View,StyleSheet} from 'react-native'

const styles= StyleSheet.create({
    container:{
        marginBottom: 20,
        borderRadius: 30,
        backgroundColor: '#d0cbcb',
        padding:20
    }
})

const TodoListItem = ({title, body}) => {
    return (
        <View
            style={styles.container}
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
