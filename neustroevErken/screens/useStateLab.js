import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const useStateLab = () => {
  const [color, setColor] = useState('grey')
  const [color2, setColor2] = useState('grey')
  const [color3, setColor3] = useState('grey')
  const [count, setCount] = useState(0)
  const colorss = ['red', 'white', 'blue', 'green', 'blue', 'black', 'yellow']

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  useEffect(() => {
    setCount(count + 1)
  }, [color, color2, color3])

  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.container}>
        <Text style={{ color: '#f6f6f6', textAlign: 'center', top: 25, fontSize: 14 }}>
          Построй флаг России (тапай по блокам)
      </Text>
      <Text style={{ color: '#f6f6f6', textAlign: 'center', top: 25, fontSize: 14 }}>
          Выполнено {count} нажатий
      </Text>
        <View
          style={styles.flexbox}>
          <TouchableOpacity
            style={[styles.boxsize, { backgroundColor: color }]}
            onPress={() => {
              setColor(colorss[getRandomInt(7)])
            }}>
            <Text style={styles.text}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.boxsize, { backgroundColor: color2 }]}
            onPress={() => {
              setColor2(colorss[getRandomInt(7)])
            }}>
            <Text style={styles.text}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.boxsize, { backgroundColor: color3 }]}
            onPress={() => {
              setColor3(colorss[getRandomInt(7)])
            }}>
            <Text style={styles.text}>3</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  flexbox: {
    flexDirection: 'column',
    alignSelf: 'center',
    top: 55
  },
  boxsize: {
    width: 180,
    height: 40,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: '#2c2c2c',
  },
  container: {
    alignSelf: 'center',
    height: 275,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#3b444b",
  }
});

export default useStateLab;