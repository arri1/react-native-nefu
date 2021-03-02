import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const App = () => {
  const [color, setColor] = useState('grey')
  const [color2, setColor2] = useState('grey')
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(count + 1)
  }, [color, color2])

  return (
    <SafeAreaView>
      <Text>
        Построй флаг Нидерландии (простой тап меняет цвет верхнего блока, а лонгтап меняет цвет нижнего блока)
        </Text>
      <View
        style={{ marginTop: 30, alignSelf: 'center', backgroundColor: color, width: 135, height: 30 }}
      />
      <View
        style={{ marginTop: 30, alignSelf: 'center', backgroundColor: color2, width: 135, height: 30 }}
      />
      <TouchableOpacity
        style={{
          width: '80%',
          height: 50,
          marginTop: 30,
          backgroundColor: '#1E90FF',
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center'
        }}
        onPress={() => {
          console.log(1)
          setColor(color === 'red' ? 'blue' : 'red')
        }}
        onLongPress={() => {
          console.log(2)
          setColor2(color2 === 'red' ? 'blue' : 'red')
        }}>
        <Text style={{ color: 'white' }}>
          КНОПКА
                </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;