// src/screens/Auth/PhoneLoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import auth from '@react-native-firebase/auth';

const PhoneLoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');

  const handleSendOtp = async () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (phoneRegex.test(phone)) {
      try {
        const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
        dispatch(login(phone));  
        navigation.navigate('OtpVerification',{confirmation});
      } catch (error:any) {
        console.error(error);
        Alert.alert('Error', `Failed to send OTP. use test phone number`);
      }
    } else {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit Indian phone number.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Your Phone Number</Text>
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <Button title="Send OTP" onPress={handleSendOtp} />
    </View>
  );
};

export default PhoneLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
});
