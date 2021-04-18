import React from 'react'
import {View,ActivityIndicator} from 'react-native'

const LoadingBar = ()=>{
    return(
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }}>
            <ActivityIndicator />
        </View>

    )
}

export default LoadingBar