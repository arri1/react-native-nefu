import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useQuery } from '@apollo/react-hooks'


import ProfileScreen from '../screens/profile'
import EditProfileScreen from '../screens/editProfile'


import { USER } from '../gqls/auth/queries'


const Stack = createStackNavigator()

const ProfileNavigator = () => {

  const user = useQuery(USER)
  const user_login = user.data.user.login
  
  return (
      <Stack.Navigator>
          <Stack.Screen 
            name="ProfileScreen" 
            component = { ProfileScreen }
            options = {{
              title: user_login
            }}
            />
          <Stack.Screen 
            name="EditProfileScreen" 
            component = { EditProfileScreen }
            options = {{
              title: 'Редактирование профиля'
            }}
            />
      </Stack.Navigator>
  )
}

export default ProfileNavigator