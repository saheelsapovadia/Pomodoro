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

import BackgroundTimer from 'react-native-background-timer';
import clockify from '../utils/Clockify';
import colors from '../assets/colors/colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {Dropdown} from 'react-native-element-dropdown';
const {UIManager} = NativeModules;
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlayPauseButton from '../components/PlayPauseButton';
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
];

export default function Home({navigation, route}) {
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [timerState, setTimerState] = useState(false);
  const [animationParameters, setAnimationParameters] = useState({
    tasksDisplay: 'flex',
    modesDisplay: 'flex',
  });

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
      <View style={[styles.tasks, {display: animationParameters.tasksDisplay}]}>
        {/* {renderLabel()} */}
        {/* <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={styles.itemTextStyle}
          containerStyle={styles.containerStyle}
          data={data}
          maxHeight={300}
          labelFie2ld="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={value}
          // statusBarIsTranslucent
          onFocus={() => {
            changeNavigationBarColor(colors.primary);
            setIsFocus(true);
          }}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        /> */}
      </View>
      <PlayPauseButton
        setSecondsLeft={setSecondsLeft}
        setTimerOn={setTimerOn}
        _onPress={_onPress}
        mode={mode}
        setTimerState={setTimerState}
        timerState={timerState}
        setAnimationParameters={setAnimationParameters}
      />
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
  //Tasks
  dropdown: {
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    // backgroundColor: 'black',
  },
  icon: {
    marginRight: 5,
  },
  containerStyle: {
    // backgroundColor: 'black',
  },
  label: {
    position: 'absolute',
    // backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: colors.background,
  },
  itemTextStyle: {
    color: colors.secondary,
  },
});
