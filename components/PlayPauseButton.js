import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
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
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: () => {
        Animated.event([null, {dy: pan.y}]);
        console.log('coordinates', pan.x, pan.y);
      },
      onPanResponderRelease: () => {
        if (pan.y > 1) {
          play();
        } else {
          Animated.spring(pan, {toValue: {x: 0, y: 0}}).start();
        }
      },
    }),
  ).current;

  const play = () => {
    setTimerState(!timerState);
    setTimerOn(timerOn => !timerOn);
    _onPress();
  };
  console.log('logging');
  return (
    <Animated.View
      style={[styles.center, {transform: [{translateY: pan.y}]}]}
      {...panResponder.panHandlers}>
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
    </Animated.View>
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
