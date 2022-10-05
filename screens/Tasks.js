import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors/colors';

export default function Tasks({navigation, route}) {
  {
    /* Central state for inter-screen task interaction */
  }

  const [tasks, setTasks] = useState(['Task 1', 'Task 2']);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
      }}>
      <Text>Tasks</Text>

      {/* Popup for new task */}
      {tasks.map((item, index) => {
        <View>
          <Text>{item}</Text>
        </View>;
      })}
      {/* List of all pending tasks */}
    </View>
  );
}
