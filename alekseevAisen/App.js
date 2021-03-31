import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client'
import apollo from './utils/apollo'
import MainNavigation from './navigation/mainNavigation';

const App = (props) => {
    return (
        <ApolloProvider client={apollo}>
            <NavigationContainer>
                <MainNavigation/>
            </NavigationContainer>
        </ApolloProvider>
    );
}

export default App