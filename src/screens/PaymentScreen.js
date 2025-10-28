import React, { useState } from 'react';
import { View, Text, TextInput, Button, Linking, Alert } from 'react-native';
import { API_BASE_URL } from '../config'; // ✅ importa URL desde config.js

const API_BASE = API_BASE_URL; // ✅ usa la IP o túnel configurado

export default function PaymentScreen() {
  const [amount, setAmount] = useState('10.00');
  const [loading, setLoading] = useState(false);

  const createCheckout = async () => {
    try {
      setLoading(true);
      // convierte 10.00 → 1000 (centavos)
      const cents = Math.round(parseFloat(amount.replace(',', '.')) * 100);
      if (isNaN(cents) || cents <= 0) {
        Alert.alert('Importe inválido', 'Ingresa un monto mayor a 0');
        setLoading(false);
        return;
      }

      const resp = await fetch(`${API_BASE}/api/payments/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cents, currency: 'usd' }),
      });

      const data = await resp.json();
      if (!resp.ok || !data?.ok || !data?.url) {
        console.log('Respuesta backend:', data);
        throw new Error('No se pudo crear la sesión de Checkout');
      }

      // abrir Stripe Checkout en el móvil
      const supported = await Linking.canOpenURL(data.url);
      if (!supported) {
        Alert.alert('Error', 'No se puede abrir la URL de Stripe.');
      } else {
        await Linking.openURL(data.url);
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', e.message || 'Fallo creando el checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#fff', gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 8 }}>Pagar con Stripe</Text>

      <Text style={{ color: '#555' }}>Importe (USD)</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        placeholder="10.00"
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 12,
          borderRadius: 8,
          fontSize: 18,
        }}
      />

      <Button
        title={loading ? 'Creando...' : 'Ir a Checkout'}
        onPress={createCheckout}
        disabled={loading}
      />

      <Text style={{ color: '#888', marginTop: 16 }}>
        Usa tarjeta de prueba: 4242 4242 4242 4242 · fecha futura · CVC 123 · ZIP 12345
      </Text>
    </View>
  );
}
