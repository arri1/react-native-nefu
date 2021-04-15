import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ProfileScreen = () => (
  <View style = { styles.container }>
    <Text>Это личный кабинет</Text>
  </View>
)

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ProfileScreen
