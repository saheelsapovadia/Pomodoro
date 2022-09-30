import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './ProfileStack/Profile';
import SettingsScreen from './ProfileStack/Settings';

const Stack = createNativeStackNavigator();

const ProfileStack = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
