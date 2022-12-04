import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  LayoutAnimation,
  NativeModules,
  Vibration,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import BackgroundTimer from 'react-native-background-timer';
import clockify from '../utils/Clockify';
import colors from '../assets/colors/colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const {UIManager} = NativeModules;

import PlayPauseButton from '../components/PlayPauseButton';
import DropDownPicker from 'react-native-dropdown-picker';
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
];

export default function Home({navigation, route, tasks, setTasks}) {
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [timerState, setTimerState] = useState(false);
  const [animationParameters, setAnimationParameters] = useState({
    tasksDisplay: 'flex',
    modesDisplay: 'flex',
  });
  const ONE_SECOND_IN_MS = 1000;
  // const tasksDisplay = useRef(new Animated.Value('flex')).current;
  // const modesDisplay = useRef(new Animated.Value('flex')).current;
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
      Vibration.vibrate(2 * ONE_SECOND_IN_MS);
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
      setSecondsLeft(10);
    } else {
      setSecondsLeft(900);
    }
  }, [mode]);

  _onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    if (timerState) {
      setAnimationParameters({
        tasksDisplay: 'flex',
        modesDisplay: 'flex',
      });
    } else {
      setAnimationParameters({
        tasksDisplay: 'none',
        modesDisplay: 'none',
      });
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

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
        <DropDownPicker
          open={open}
          value={value}
          items={tasks}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setTasks}
          placeholder="Select a Task"
          placeholderStyle={{}}
          dropDownContainerStyle={{
            borderWidth: 0,
            width: '90%',
            alignSelf: 'center',
          }}
          renderListItem={props => <Item {...props} />}
          props={{
            activeOpacity: 0.8,

            style: {
              backgroundColor: colors.secondary,
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              borderRadius: 90,
              elevation: 4,
            },
          }}
        />
      </View>
      {/* <Animated.View style={styles.animatedView}> */}
      <PlayPauseButton
        setSecondsLeft={setSecondsLeft}
        setTimerOn={setTimerOn}
        _onPress={_onPress}
        mode={mode}
        setTimerState={setTimerState}
        timerState={timerState}
        setAnimationParameters={setAnimationParameters}
      />
      {/* </Animated.View> */}
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

const Item = props => {
  return (
    <TouchableOpacity onPress={() => props.onPress(props)} activeOpacity={0.5}>
      <View style={styles.ItemContainer}>
        <Text style={styles.ItemItem}>{props.item.label}</Text>
        <Text style={styles.ItemItem}>{props.item.pomoCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontFamily: 'Quantico-Bold',
    color: colors.background,
    textAlign: 'center',
    padding: 0,
  },
  timerPause: {
    padding: 0,
    margin: 0,
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
  // animatedView: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
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
  ItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  ItemItem: {
    fontSize: 15,
  },
});
