import React from 'react'
import { 
    Text, 
    View, 
    Image, 
    Dimensions,
    ImageBackground, 
    StyleSheet } 
from 'react-native'

import image1 from '../images/batmage.png'
import image2 from '../images/dimalalka.png'
import image3 from '../images/graphql.png'
import image4 from '../images/masta.png'

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    mainContainer: {
        width
    },
    paddings: {
        marginBottom: 20,
        marginStart: 20,
        marginEnd: 20,
        borderRadius: 50,
        backgroundColor: '#FAEBD7',
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

//const image1 = { uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png" };

const randomArrayImage = [
{ uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png" },
{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/DC_Comics_logo.png/600px-DC_Comics_logo.png" },
{ uri: "https://i1.sndcdn.com/avatars-000780790396-z317ol-t500x500.jpg" },
image1,
image2,
image3,
image4,
]
const randomIndex=()=>{
    const rand = Math.floor(Math.random()*7)
    return rand
}

const TodoListItem = ({ title, body, author_key }) => {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.paddings}>
                <View style={styles.image_and_text_row}>
                    <ImageBackground source={randomArrayImage[randomIndex()]} style={styles.image_round}/>

                    <View style={{marginLeft: 10}}>
                        <Text numberOfLines={1} style={styles.text_title}>{title}</Text>
                        
                        <Text style={styles.text_author}>Posted by author_{randomIndex()}</Text>
                    </View>
                </View>

                <Text numberOfLines={3} style={{marginTop: 8}}>{body}</Text>
            </View>
        </View>
    )
}

export default TodoListItem
