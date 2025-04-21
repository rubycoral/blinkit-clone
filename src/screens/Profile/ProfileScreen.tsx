// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const phoneNumber = useSelector((state: any) => state.auth.phoneNumber);

  const handleLogout = () => {
    dispatch(logout()); // Clears phone number and sets isLoggedIn to false
    navigation.navigate('PhoneLogin'); // Redirect to login screen
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Phone Number: {phoneNumber}</Text>
      <Button title="Your Orders" onPress={() => navigation.navigate('Orders')} />
      <View style={{ marginTop: 10 }}>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default ProfileScreen;
