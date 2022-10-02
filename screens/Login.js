import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.ImageView}>
        <ImageBackground
          source={require('../assets/images/Delivery.jpg')}
          resizeMode="cover"
          style={styles.image}></ImageBackground>
      </View>
      <View style={styles.ButtonView}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Image
            source={require('../assets/images/Google.png')}
            // resizeMode="cover"
            style={styles.googleBtn}></Image>
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
