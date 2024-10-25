import {
  ActivityIndicator,
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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStack.tsx';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export const SingleUserScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    params: { userId }
  } = useRoute<RouteProp<RootStackParamList, 'SingleUser'>>();

  const [user, setUser] = useState<UserData>();
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const getUser = async () => {
      const result = await fetch(
        'https://jsonplaceholder.typicode.com/users/' + userId
      );
      const data = await result.json();
      return data;
    };
    getUser()
      .then((data) => setUser(data))
      .catch(() => null);
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Text style={styles.goBackButton} onPress={() => navigation.goBack()}>
        Back
      </Text>
      <Spacer value={16} />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>User info:</Text>
        {user && (
          <>
            <View style={styles.userCard}>
              <Text>Name: {user.name}</Text>
              <Text>Username: {user.username}</Text>
              <Text>Email: {user.email}</Text>
              <Text>Phone: {user.phone}</Text>
              <Text>
                Address: {user.address.city}, {user.address.street},{' '}
                {user.address.suite}
              </Text>
              <Text>Website: {user.website}</Text>
              <Text>Company: {user.company.name}</Text>
            </View>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: +user.address.geo.lat,
                longitude: +user.address.geo.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            />
          </>
        )}
        {!user && <ActivityIndicator size="large" />}
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
  goBackButton: {
    fontSize: 20
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
  },
  map: {
    height: 250,
    width: '100%',
    borderRadius: 16
  }
});
