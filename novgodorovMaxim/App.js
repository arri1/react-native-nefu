import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer,DefaultTheme} from '@react-navigation/native'
import {ApolloProvider} from '@apollo/client'
import apollo from './utils/apollo'
import RootStackNavigator from './navigators/rootStackNavigator'
import FlashMessage from "react-native-flash-message";
import { Dimensions, View } from 'react-native'

const {width, height} = Dimensions.get('screen')

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background:'white',
  },
};

const App = () => {
  return (
    <View style={{width,height}}>
      <ApolloProvider client={apollo}>
        <NavigationContainer theme={MyTheme}>
            <RootStackNavigator/>
        </NavigationContainer>
      </ApolloProvider>
      <FlashMessage position="top"/>
    </View>
  );
}

export default App;
