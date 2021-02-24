import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('screen');
var windowwidth = Dimensions.get('window').width; //full width
var magnifier = 10;
var magnified = function(magnifier){
  return {
    width: windowwidth,
    alignSelf:'center',
    backgroundColor: 'blue',
    height: magnifier,
  }
}
const App = () => {
  const [magnifier,setCount] = useState(10);
  const [color_int,setCountNumb] = useState(0);
  return (
    <View
      style={{ width, height }}
    >
      <Text
        style={{
          textAlign:'center',
          marginTop: 50,
          fontSize: 50,
          }}>Ручной водопад</Text>

      <TouchableOpacity
        style={{
          padding: 20,
          alignItems:'center',
          Text:"dsd",
          backgroundColor: 'red'
        }}
        title={'Нажималка'}
        onPress={() => {
          setCount(magnifier + 10);
        }}>

          <Text
            style={{
              fontSize: 20,
            }}>Включаем гравитацию</Text>

      </TouchableOpacity>
      <View
        style={magnified(magnifier)}
      />
    </View>
  );
};

export default App;
