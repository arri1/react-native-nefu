import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MainScreen = () => (
  <View style = { styles.container }>
    <Text>Главаня страница-мраница</Text>
  </View>
)

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default MainScreen
