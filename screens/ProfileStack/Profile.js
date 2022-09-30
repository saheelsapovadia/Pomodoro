import {View, Text, Button} from 'react-native';
import React from 'react';

const Profile = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('SettingsScreen')}
      />
    </View>
  );
};

export default Profile;
