import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';
import PaymentScreen from '../screens/PaymentScreen'; // ruta correcta

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Inicio</Text>
      <Button
        title="Ir a Pago"
        onPress={() => navigation.navigate('Payment')}
      />
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#4A90E2' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'I GUIDE U' }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ title: 'Pagar' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
