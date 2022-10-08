import {
  View,
  Text,
  Modal,
  Button,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors/colors';

const AddTaskModal = ({addNewTask, setModalVisible}) => {
  const [taskName, setTaskName] = useState('');
  const [pomoCount, setPomoCount] = useState('');
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalContainer}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setTaskName}
            value={taskName}
            placeholder="Add new task"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPomoCount}
            value={pomoCount}
            placeholder="Number of pomodoro"
            keyboardType="numeric"
          />
        </View>
        <Button
          title="Add"
          onPress={() => {
            addNewTask({taskName: taskName, pomoCount: pomoCount});
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // backgroundColor: 'red',
  },
  modalContainer: {
    // alignItems: 'center',
    width: '80%',
    padding: 20,
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    alignSelf: 'center',
    height: 40,
    margin: 12,
    width: '80%',
    borderWidth: 1,
    padding: 10,
  },
});

export default AddTaskModal;
