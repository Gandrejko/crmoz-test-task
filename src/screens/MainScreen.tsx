import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { UserData } from '../appTypes';
import { Spacer } from '../components/Spacer.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStack.tsx';

export const MainScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [users, setUsers] = useState<UserData[]>([]);
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const getUsers = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await result.json();
      return data;
    };
    getUsers()
      .then((data) => setUsers(data))
      .catch(() => null);
  }, []);

  const handlePress = (userId: number) => {
    navigation.navigate('SingleUser', { userId });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Users:</Text>
        <View>
          {users.map((user) => (
            <TouchableOpacity
              onPress={() => handlePress(user.id)}
              style={styles.userCard}
              key={user.id}
            >
              <Text>{user.name}</Text>
              <Text>{user.email}</Text>
              <Text>{user.phone}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Spacer value={bottom + 16} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24
  },
  content: {
    paddingBottom: 60
  },
  userCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8
  }
});
