import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'


const MainScreen = () => {
  console.log("mainScreen")
  return(
    <SafeAreaView style = { styles.container }>
      <Text>Главаня страница-мраница</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default MainScreen
