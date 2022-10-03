import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tasks from '../screens/Tasks';
import Home from '../screens/Home';
import ProfileStack from '../screens/ProfileStack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import colors from '../assets/colors/colors';

const Tab = createBottomTabNavigator();

const BottomTabs = ({navigation}) => {
  const tabBarOptions = {
    showLabel: false,
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 5,
    backgroundColor: colors.secondary,
    borderRadius: 90,
    height: 70,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabBarOptions,
      }}
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({route}) => ({
          tabBarIcon: ({color, focused}) => (
            <Icon icon="home" focused={focused} navigation={navigation} />
          ),
        })}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={({route}) => ({
          tabBarIcon: ({color, focused}) => (
            <Icon icon="home" focused={focused} navigation={navigation} />
          ),
        })}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            ...tabBarOptions,
          },
          tabBarIcon: ({color, focused}) => (
            <Icon icon="home" focused={focused} navigation={navigation} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const Icon = props => {
  return (
    <View>
      {/* onPress={() => props.navigation.navigate(props.navigateTo)}> */}
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: 'center',
          color: props.focused ? colors.primary : colors.background,
        }}
      />
    </View>
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.secondary,
    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabs;
