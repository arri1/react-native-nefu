import React from 'react'
import { View, StyleSheet } from 'react-native'


const toDo = (title, key) => {
    return(
        <View style = { styles.container } >
            <Text>
               Пост под номером: { key }
            </Text>
            <Text>
                { title }
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