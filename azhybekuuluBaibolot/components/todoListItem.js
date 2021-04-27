import React from 'react'
import {Text, View,StyleSheet} from 'react-native'

const styles= StyleSheet.create({
    container:{
        flex: 1,
        minHeight: 200,
        borderRadius: 20,
        margin: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#197BDD'
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
