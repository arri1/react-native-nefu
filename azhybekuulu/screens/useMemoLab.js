import React, {useState,useMemo} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

const sum = n => {
    return n + n
};

const useMemoLab = () => {
    const [num, setNum] = useState(1);
    const [isGreen, setIsGreen] = useState(true);
    const result = sum(num);
    return (
        <View
            style={{flex:1,justifyContent:'center',alignItems:'center'}}
        >
            <TouchableOpacity onPress={() => setIsGreen(!isGreen)}
            >
                <Text
                    style={{color: isGreen ? 'green' : 'red'}}
                >
                    Example

                </Text>
            </TouchableOpacity>
            <Text>
                Sum {result}
            </Text>
            <TouchableOpacity onPress={() => setNum(num + 1)}>
                <Text>
                    ➕
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default useMemoLab
