import React from 'react'
import { View, StyleSheet, Text } from 'react-native'


const toDo = (task) => {
    return(
        <View style = { styles.container } >
            <Text>
                { task.task }
            </Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        height: 60,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingLeft: 10,
        elevation: 1
    }
})

export default toDo