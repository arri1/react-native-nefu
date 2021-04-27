import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function homeScreen() {
  return (
    <View style={styles.MainContainer}>
      <Text style={{ color: '#f6f6f6', fontFamily: "Cochin" }}>Home :)</Text>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2c2c2c',
    }
  });

export default homeScreen;
