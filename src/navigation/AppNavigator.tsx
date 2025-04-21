// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PhoneLoginScreen from '../screens/Auth/PhoneLoginScreen';
import OtpVerificationScreen from '../screens/Auth/OtpVerificationScreen';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ProductDetailScreen from '../screens/ProductDetails/ProductDetailScreen';
import OrderHistory from '../screens/OrderHistory/OrderHistory';
import Splash from '../screens/Splahscreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
     {/* <Stack.Navigator initialRouteName="Home"> */}
     {/* <Stack.Navigator initialRouteName="PhoneLogin"> */}
     <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
  <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} options={{ headerShown: false }} />
  <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }}/>
  <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="Orders" component={OrderHistory} />
  <Stack.Screen name="Cart" component={CartScreen} screenOptions={{ headerShown: true }}/>
  <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />

</Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
