// src/screens/Auth/OtpVerificationScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import axios from 'axios';
import { API_URL, RAZORPAY_KEY } from '@env';


type RootStackParamList = {
  PhoneLogin: undefined;
  OtpVerification: { confirmation: any }; // Expecting confirmation here
  Home: undefined;
};

const OtpVerificationScreen = ({ route }: any) => {
  const { confirmation } = route.params;  // Use the confirmation passed from PhoneLoginScreen
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const phoneNumber: any = useSelector((state: RootState) => state.auth.phoneNumber);
  const [otp, setOtp] = useState('');

  const createUser = async () => {
    try {
      // const response = await axios.post('http://192.168.1.36:5000/create-user', {
      const response = await axios.post(`${API_URL}/create-user`, {
        phoneNumber: phoneNumber,
        // Add other details you need, like name, email, etc.
      });
      if (response.data.success) {
        console.log('User created successfully');
      } else {
        console.error('Error creating user:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating user-error:', error);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length === 6) {
      try {
        await confirmation.confirm(otp);
        await createUser();        
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } catch (error) {
        console.error(error);
        Alert.alert('Invalid OTP', 'Please check the OTP and try again.');
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter OTP sent to {phoneNumber}</Text>
      <TextInput
        placeholder="OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
    </View>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
});
