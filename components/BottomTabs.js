import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tasks from '../screens/Tasks';
import Home from '../screens/Home';
import ProfileStack from '../screens/ProfileStack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabs = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({route}) => ({
          tabBarIcon: ({color, focused}) => (
            <Icon icon="home" navigation={navigation} />
          ),
        })}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={({route}) => ({
          tabBarIcon: ({color, focused}) => (
            <Icon icon="home" navigation={navigation} />
          ),
        })}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
          },
          tabBarIcon: ({color, focused}) => (
            <Icon icon="home" navigation={navigation} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const Icon = props => {
  return (
    <TouchableOpacity>
      {/* onPress={() => props.navigation.navigate(props.navigateTo)}> */}
      <View>
        <FontAwesome5
          name={props.icon}
          size={25}
          style={{marginBottom: 3, alignSelf: 'center'}}
        />
        <Text> {props.text} </Text>
      </View>
    </TouchableOpacity>
  );
};

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  if (routeName == 'SettingsScreen') {
    return 'none';
  } else {
    return 'flex';
  }
};

export default BottomTabs;
