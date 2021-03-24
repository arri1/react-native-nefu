import React from 'react'
import { 
    Text, 
    View, 
    Image, 
    Dimensions,
    ImageBackground, 
    StyleSheet } 
from 'react-native'

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    mainContainer: {
        width
    },
    paddings: {
        marginBottom: 20,
        marginStart: 10,
        marginEnd: 10,
        borderRadius: 30,
        backgroundColor: '#d0cbcb',
        padding: 20
    },
    text_title:{
        fontSize: 24,
    },
    text_author:{
        marginTop: 0,
        marginLeft: 10,
        fontSize: 16
    },
    image_round:{
        width: 80,
        height: 80,
        //Below lines will help to set the border radius
        borderRadius: 50,
        overflow: 'hidden',
    },
    image_and_text_row:{
        flexDirection: 'row',
        width: '77.5%'
    }
})

const image = { uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png" };

const TodoListItem = ({ title, body, author_key }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.paddings}>
                <View style={styles.image_and_text_row}>
                    <ImageBackground source={image} style={styles.image_round}/>

                    <View style={{marginLeft: 10}}>
                        <Text numberOfLines={1} style={styles.text_title}>{title}</Text>
                        
                        <Text style={styles.text_author}>Posted by author_{author_key}</Text>
                    </View>
                </View>

                <Text numberOfLines={3} style={{marginTop: 8}}>{body}</Text>
            </View>
        </View>
    )
}

export default TodoListItem
