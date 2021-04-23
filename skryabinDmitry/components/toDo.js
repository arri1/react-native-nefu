import React from 'react'
import { View, StyleSheet, Text } from 'react-native'


const toDo = (task) => {

    console.log(task.task)
    return(
        <View style = { styles.container } >
            <Text>
                lol
                { task.task }
            </Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: '100%',
        height: 100
    }
})

export default toDo