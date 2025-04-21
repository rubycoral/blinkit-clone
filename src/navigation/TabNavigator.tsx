// src/navigation/TabNavigator.tsx

import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Home/CategoriesScreen';
import Header from '../components/Header';
import HomeIcon from '../assets/icons/homeIcon';
import CategoriesIcon from '../assets/icons/categoriesIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [address, setAddress] = useState('Mumbai, 400001');

  const handleAddressPress = () => {
    setAddress('Changed Address, Mumbai');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header address={address} onAddressPress={handleAddressPress} />
      <Tab.Navigator  screenOptions={({ route }:any) => ({
    headerShown: false,
    tabBarActiveTintColor: '#000000', // Active color
    tabBarInactiveTintColor: '#999',  // Inactive color
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
    },   
  })}>
        <Tab.Screen name="Home" component={HomeScreen}  options={{
          tabBarIcon: ({ focused }:any) => (
            <HomeIcon color={focused ? '#000000' : '#999'} />
          ),
        }}/>
        <Tab.Screen name="Categories" component={CategoriesScreen}  options={{
          tabBarIcon: ({ focused }:any) => (
            <CategoriesIcon color={focused ? '#000000' : '#999'} />
          ),
        }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigator;
