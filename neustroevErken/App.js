import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const App = () => {
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
    <SafeAreaView>
      <Text>
        Построй флаг России (тапай по блокам) Выполнено {count} нажатий
      </Text>

      <TouchableOpacity
        style={[styles.box1, { backgroundColor: color }]}
        onPress={() => {
          setColor(colorss[getRandomInt(7)])
        }}>
        <Text style={styles.text}>1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.box2, { backgroundColor: color2 }]}
        onPress={() => {
          setColor2(colorss[getRandomInt(7)])
        }}>
        <Text style={styles.text}>2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.box3, { backgroundColor: color3 }]}
        onPress={() => {
          setColor3(colorss[getRandomInt(7)])
        }}>
        <Text style={styles.text}>3</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  box1: {
    position: 'absolute',
    top: 55,
    alignSelf: 'center',
    width: 180,
    height: 40,
  },
  box2: {
    position: 'absolute',
    top: 95,
    alignSelf: 'center',
    width: 180,
    height: 40,
  },
  box3: {
    position: 'absolute',
    top: 135,
    alignSelf: 'center',
    width: 180,
    height: 40,
  }
});
export default App;