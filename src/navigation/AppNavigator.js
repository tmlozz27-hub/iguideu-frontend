// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ title: 'I GUIDE U – Pago' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
