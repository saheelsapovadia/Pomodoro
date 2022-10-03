import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Pressable,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BackgroundTimer from 'react-native-background-timer';
import clockify from '../utils/Clockify';
import colors from '../assets/colors/colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export default function Home({navigation, route}) {
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [timerState, setTimerState] = useState(true);
  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [secondsLeft]);
  useEffect(() => {
    changeNavigationBarColor(colors.primary);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Text style={styles.time}>
        {clockify(secondsLeft).displayMins} :{' '}
        {clockify(secondsLeft).displaySecs}{' '}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setTimerState(!timerState);
          setTimerOn(timerOn => !timerOn);
        }}>
        <View>
          <FontAwesome
            name={timerState ? 'play-circle' : 'pause-circle'}
            size={60}
            color={colors.secondary}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setTimerOn(timerOn => !timerOn);
          setSecondsLeft(() => {
            if (mode == 'pomodoro') return 1500;
            if (mode == 'rest') return 300;
            if (mode == 'lrest') return 900;
          });
        }}>
        <MaterialIcons name="refresh" size={40} />
      </TouchableOpacity>
      <View style={styles.modeView}>
        <TouchableOpacity
          style={styles.mode}
          onPress={() => {
            setMode('pomodoro');
            setSecondsLeft(1500);
          }}>
          <Text>Pomodoro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mode}
          onPress={() => {
            setMode('rest');
            setSecondsLeft(300);
          }}>
          <Text>Rest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mode}
          onPress={() => {
            setMode('lrest');
            setSecondsLeft(900);
          }}>
          <Text>Long Rest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 70,
    fontFamily: 'Quantico-Bold',
    color: colors.background,
    marginBottom: 30,
    textAlign: 'center',
  },
  modeView: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mode: {
    marginHorizontal: 10,
  },
});
