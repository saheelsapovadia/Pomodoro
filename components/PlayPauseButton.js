import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import colors from '../assets/colors/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const PlayPauseButton = ({
  timerState,
  setSecondsLeft,
  setTimerOn,
  setTimerState,
  _onPress,
  mode,
  setAnimationParameters,
}) => {
  const play = () => {
    setTimerState(!timerState);
    setTimerOn(timerOn => !timerOn);
    _onPress();
  };
  return (
    <View style={[styles.center]}>
      <TouchableOpacity
        onPress={() => {
          play();
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
          setAnimationParameters({
            tasksDisplay: 'flex',
            modesDisplay: 'flex',
          });
        }}>
        <MaterialIcons name="refresh" size={40} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PlayPauseButton;
