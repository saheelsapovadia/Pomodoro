import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Tasks({navigation, route, tasks, setTasks}) {
  const TaskList = item => {
    return (
      <View style={styles.taskItem}>
        <Text style={styles.taskItemText}>{item.item.label}</Text>
      </View>
    );
  };
  const [number, onChangeNumber] = React.useState(null);

  const addNewTask = () => {
    setTasks([...tasks, {label: number, value: number}]);
    onChangeNumber('');
  };

  return (
    <View style={styles.container}>
      {/* Popup for new task */}
      <View style={styles.newTaskContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Add new task"
        />
        <TouchableOpacity onPress={() => addNewTask()}>
          <Ionicons name="add-outline" size={40} />
        </TouchableOpacity>
      </View>

      {/* List of all pending tasks */}
      <View style={styles.taskList}>
        <FlatList
          data={tasks}
          renderItem={TaskList}
          keyExtractor={item => item.label}
          style={{height: 40}}
        />
        {/* <TaskList /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 100,
  },
  newTaskContainer: {
    marginTop: '25%',
    marginBottom: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    width: '80%',
    borderWidth: 1,
    padding: 10,
  },
  inputContainer: {},
  taskList: {
    flex: 1,
  },
  taskItem: {
    // flex: 1,
    width: '80%',
    marginLeft: '10%',
    borderColor: colors.background,
    borderWidth: 2,
    padding: 15,
  },
  taskItemText: {
    padding: 1,
  },
});
