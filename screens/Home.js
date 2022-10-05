import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  LayoutAnimation,
  NativeModules,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BackgroundTimer from 'react-native-background-timer';
import clockify from '../utils/Clockify';
import colors from '../assets/colors/colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function Home({navigation, route}) {
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [timerState, setTimerState] = useState(false);
  const [animationParameters, setAnimationParameters] = useState({
    tasksDisplay: 'none',
    modesDisplay: 'none',
  });
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

  useEffect(() => {
    setTimerState(false);
    setTimerOn(false);
    if (mode == 'pomodoro') {
      setSecondsLeft(1500);
    } else if (mode == 'rest') {
      setSecondsLeft(300);
    } else {
      setSecondsLeft(900);
    }
  }, [mode]);

  _onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    if (timerState)
      setAnimationParameters({
        tasksDisplay: 'flex',
        modesDisplay: 'flex',
      });
    else {
      setAnimationParameters({
        tasksDisplay: 'none',
        modesDisplay: 'none',
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.timerView}>
        {timerState ? (
          <Text
            style={[
              styles.time,
              timerState ? styles.timerPlay : styles.timerPause,
            ]}>
            {clockify(secondsLeft).displayMins} :{' '}
            {clockify(secondsLeft).displaySecs}{' '}
          </Text>
        ) : (
          <Text
            style={[
              styles.time,
              timerState ? styles.timerPlay : styles.timerPause,
            ]}>
            {clockify(secondsLeft).displayMins}
          </Text>
        )}
      </View>
      <View
        style={[
          styles.tasks,
          {display: animationParameters.tasksDisplay},
        ]}></View>
      <View style={styles.center}>
        <TouchableOpacity
          onPress={() => {
            setTimerState(!timerState);
            setTimerOn(timerOn => !timerOn);
            _onPress();
          }}>
          <View style={styles.btnContainer}>
            <View style={styles.playPauseButton}>
              <Text style={styles.playPauseButtonText}>
                {!timerState ? 'START' : 'STOP'}
              </Text>
              <View
                style={
                  !timerState ? styles.trianglePlay : styles.trianglePause
                }></View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reset}
          onPress={() => {
            setTimerOn(false);
            setTimerState(false);
            setSecondsLeft(() => {
              if (mode == 'pomodoro') return 1500;
              if (mode == 'rest') return 300;
              if (mode == 'lrest') return 900;
            });
          }}>
          <MaterialIcons name="refresh" size={40} color={colors.secondary} />
        </TouchableOpacity>
      </View>
      <View
        style={[styles.modeView, {display: animationParameters.modesDisplay}]}>
        <TouchableOpacity
          onPress={() => {
            setMode('pomodoro');
          }}>
          <Text style={mode === 'pomodoro' ? styles.modeSelected : styles.mode}>
            Pomodoro
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMode('rest');
          }}>
          <Text style={mode === 'rest' ? styles.modeSelected : styles.mode}>
            Rest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMode('lrest');
          }}>
          <Text style={mode === 'lrest' ? styles.modeSelected : styles.mode}>
            Long Rest
          </Text>
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
  timerView: {
    position: 'absolute',
    top: '10%',
  },
  time: {
    fontFamily: 'Quantico-Bold',
    color: colors.background,
    textAlign: 'center',
  },
  timerPause: {
    fontSize: 90,
  },
  timerPlay: {
    fontSize: 70,
  },
  tasks: {
    height: 60,
    width: '80%',
    marginTop: '50%',
    marginBottom: 40,
  },
  center: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reset: {
    position: 'absolute',
    right: 60,
  },
  playPauseButton: {
    width: 130,
    height: 130,
    borderRadius: 90,
    backgroundColor: colors.secondary,
    alignItems: 'center',
  },
  playPauseButtonText: {
    color: colors.primary,
    fontSize: 24,
    marginTop: 32,
    fontWeight: '600',
  },
  trianglePause: {
    marginTop: 10,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.primary,
    borderLeftColor: 'transparent',
    transform: [{rotate: '180deg'}],
  },
  trianglePlay: {
    marginTop: 10,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.primary,
    borderLeftColor: 'transparent',
  },
  modeView: {
    marginTop: 'auto',
    position: 'absolute',
    bottom: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mode: {
    fontSize: 17,
    color: colors.background,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    fontWeight: '500',
  },
  modeSelected: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.background,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 90,
    backgroundColor: colors.modeSelectedBackground,
  },
});
