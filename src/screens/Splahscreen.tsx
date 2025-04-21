// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Splash = ({ navigation }: any) => {
  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
    //   SplashScreen.hide(); // Hide splash screen after it's shown for a few seconds
      navigation.replace('PhoneLogin'); // Navigate to your home screen or main screen
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/BlinkitSplashScreen.png')} style={styles.logo} />
      {/* <Text style={styles.appName}>My App</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Splash;
