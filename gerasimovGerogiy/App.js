import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UseStateLab from './screens/useStateLab'
import UseMemoLab from './screens/useMemoLab'
import TodoList from './screens/todoList'

const Tab = createBottomTabNavigator();

const App = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="useStateLab" component={UseStateLab} />
                <Tab.Screen name="useMemoLab" component={UseMemoLab} />
                <Tab.Screen name="todoList" component={TodoList} />
            </Tab.Navigator>
        </NavigationContainer>
    )
};

export default App;
