import {View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';
import Delivery from '../assets/images/Delivery.svg';
import GoogleBtn from '../assets/images/Component_3.svg';
const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.ImageView}>
        <Delivery size={10} />
      </View>
      <View style={styles.ButtonView}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <GoogleBtn />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ImageView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    marginTop: 100,
    width: 300,
    height: 400,
  },
  ButtonView: {
    flex: 1,
    // borderColor: 'black',
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleBtn: {
    // flex: 1,
    width: 120,
    height: 120,
    borderColor: '#F35656',
    borderWidth: 5,
    borderRadius: 90,
  },
});

export default Login;
