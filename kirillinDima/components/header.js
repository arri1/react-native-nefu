import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Мои задачи</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  }
});