import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/MainScreen.tsx';
import { SingleUserScreen } from '../screens/SingleUserScreen.tsx';

export type RootStackParamList = {
  Main: undefined;
  SingleUser: { userId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="SingleUser" component={SingleUserScreen} />
    </Stack.Navigator>
  );
};
