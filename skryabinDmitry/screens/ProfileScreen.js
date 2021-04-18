import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'


const ProfileScreen = () => (
  <SafeAreaView style = { styles.container }>
    <Text>Это личный кабинет</Text>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ProfileScreen
