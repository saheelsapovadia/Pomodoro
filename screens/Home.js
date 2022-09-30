import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BackgroundTimer from 'react-native-background-timer';

export default function Home({navigation, route}) {
  const [mode, setMode] = useState('pomodoro');
  //set an enum for [pomodoro, rest, long rest]; with time durations
  const [timerState, setTimerState] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(1500);
  //break 300, long break 900

  const [timerOn, setTimerOn] = useState(false);

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

  // useEffect(() => {
  //   if (mode == 'pomodoro') setSecondsLeft(1500);
  //   else if (mode == 'rest') setSecondsLeft(30);
  //   else if (mode == 'lrest') setSecondsLeft(900);
  // }, [mode]);

  //shift to utilities file
  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.time}>
        {clockify().displayMins} Mins {clockify().displaySecs} Secs
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
            color=""
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSecondsLeft(timer.getTime());
        }}>
        <MaterialIcons name="refresh" size={40} />
      </TouchableOpacity>
      <View style={styles.modeView}>
        <TouchableOpacity
          style={styles.mode}
          onPress={() => {
            timer.setMode('pomodoro', () => {
              setMode('pomodoro');
              setSecondsLeft(timer.getTime());
            });
          }}>
          <Text>pomodoro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mode}
          onPress={() => {
            timer.setMode('rest', () => {
              setMode('rest');
              setSecondsLeft(timer.getTime());
            });
          }}>
          <Text>Rest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mode}
          onPress={() => {
            timer.setMode('lrest', () => {
              setMode('lrest');
              setSecondsLeft(timer.getTime());
            });
          }}>
          <Text>Long Rest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: 30,
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
  },
  modeView: {
    // flex: 1,
    // width: 100,
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mode: {
    marginHorizontal: 10,
  },
});
