import React from 'react'
import {Text, View,StyleSheet} from 'react-native'

const styles= StyleSheet.create({
    listTile: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#666666"
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
