import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL, RAZORPAY_KEY } from '@env';

const CartScreen = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalValue = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.details}>
          ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
        </Text>
      </View>
    </View>
  );

  const saveOrder = async (orderDetails: any) => {
    try {
      // const response = await axios.post('http://192.168.1.36:5000/save-order', orderDetails);
      const response = await axios.post(`${API_URL}/save-order`, orderDetails);
      if (response.data.success) {
        console.log('Order saved successfully');
      } else {
        console.error('Error saving order:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const handlePayment = async () => {
    try {
      // const response = await axios.post('http://192.168.1.36:5000/create-order', {
      const response = await axios.post(`${API_URL}/create-order`, {
        amount: totalValue,
      });

      const order = response.data;
      console.log('Order from backend:', order);

      const options = {
        description: 'Order Payment',
        image: 'https://your-logo-url.com/logo.png',
        currency: 'INR',
        key: 'rzp_test_AODroWFijA9XT0', // Razorpay public key
        amount: order.amount, // from backend (already in paise)
        name: 'Blinkit Clone',
        order_id: order.id, // Very important!
        prefill: {
          email: 'testuser@example.com',
          contact: '9819609083',
          name: 'Test User',
        },
        theme: { color: '#F37254' },
      };

      RazorpayCheckout.open(options)
        .then(async (data: any) => {
          console.log('Payment success:', data);

          // const verifyRes = await axios.post('http://192.168.1.36:5000/verify-payment', {
          const verifyRes = await axios.post(`${API_URL}/verify-payment`, {
            payment_id: data.razorpay_payment_id,
            order_id: data.razorpay_order_id,
            signature: data.razorpay_signature,
          });

          if (verifyRes.data.success) {
            Alert.alert('Payment Verified', 'Payment completed successfully!');
            const orderDetails = {
              items: cartItems,
              amount: totalValue,
              userDetails: {
                phoneNumber: '9819609083',
                name: 'Test User',
                email: 'testuser@example.com',
              },
              orderId: data.razorpay_order_id,
              paymentId: data.razorpay_payment_id,
            };

            await saveOrder(orderDetails); 
            setTimeout(() => {
              Alert.alert('Order Confirmed', 'Your order will be delivered in 20 minutes!');
              navigation.navigate('Home');
            }, 1500);
          } else {
            Alert.alert('Verification Failed', verifyRes.data.message);
          }
        })
        .catch((error: any) => {
          console.error('Payment failed:', error);
          Alert.alert('Payment failed or cancelled');
        });
    } catch (error) {
      console.error('Error during payment:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalValue}>₹{totalValue}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Make Payment" onPress={handlePayment} color="#237701" />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Set background to white
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#666',
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: 'green',
  },
  buttonContainer: {
    marginTop: 20,
  },
  flatListContent: {
    paddingBottom: 100, // Prevent overlap with button
  },
});
