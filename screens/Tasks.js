import {View, Text, Button} from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';

export default function Tasks({navigation, route}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
      }}>
      <Text>Tasks</Text>
    </View>
  );
}
