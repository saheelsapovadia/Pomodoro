import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddTaskModal from '../components/AddTaskModal';
const TaskList = item => {
  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskItemText}>{item.item.label}</Text>
      <Text style={styles.taskItemText}>{item.item.pomoCount}</Text>
    </View>
  );
};
export default function Tasks({navigation, route, tasks, setTasks}) {
  const [number, onChangeNumber] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const addNewTask = newTask => {
    setTasks([
      ...tasks,
      {
        label: newTask.taskName,
        value: newTask.taskName,
        pomoCount: newTask.pomoCount,
      },
    ]);
    onChangeNumber('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Popup for new task */}
      {/* <View style={styles.newTaskContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Add new task"
        />
        <TouchableOpacity onPress={() => addNewTask()}>
          <Ionicons name="add-outline" size={40} />
        </TouchableOpacity>
      </View> */}
      <Button title="Add new task" onPress={() => setModalVisible(true)} />
      <Modal
        style={styles.addTaskModal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {/* <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}> */}
        <AddTaskModal
          addNewTask={addNewTask}
          setModalVisible={setModalVisible}
        />
        {/* </TouchableWithoutFeedback> */}
      </Modal>

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
    paddingTop: 50,
  },
  newTaskContainer: {
    marginTop: '25%',
    marginBottom: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addTaskModal: {
    backgroundColor: colors.secondary,
    width: '80%',
    height: '50%',
  },
  inputContainer: {},
  taskList: {
    flex: 1,
    marginTop: 40,
  },
  taskItem: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginLeft: '10%',
    borderColor: colors.background,
    borderWidth: 2,
    padding: 15,
  },
  taskItemText: {
    padding: 1,
    color: colors.background,
    fontSize: 20,
  },
});
