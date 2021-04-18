import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {ApolloProvider} from '@apollo/client'
import apollo from './utils/apollo'
import FlashMessage from "react-native-flash-message";
import { View } from 'react-native'


import RootStackNavigator from './navigation/RootStackNavigator'
import AppNavigator from './navigation/AppNavigator'



const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApolloProvider client={ apollo }>
        <NavigationContainer>
            <RootStackNavigator />
        </NavigationContainer>
      </ApolloProvider>
      <FlashMessage position="top"/>
    </View>
  );
}

export default App;
