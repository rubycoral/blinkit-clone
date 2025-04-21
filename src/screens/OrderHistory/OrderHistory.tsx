import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL, RAZORPAY_KEY } from '@env';

const OrderHistory = () => {
  const phoneNumber = useSelector((state: any) => state.auth.phoneNumber);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
    //   const res = await axios.get(`http://192.168.1.36:5000/orders/${phoneNumber}`);
      const res = await axios.get(`${API_URL}/orders/${phoneNumber}`);
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Your Orders</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : orders.length === 0 ? (
        <Text>No orders found for {phoneNumber}</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
              <Text style={{ fontWeight: 'bold' }}>Order Title: {item.title}</Text>
              <Text>Order Date: {new Date(item.createdAt).toLocaleDateString()}</Text>

              {/* Displaying Product List */}
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Products:</Text>
                {item.products && item.products.length > 0 ? (
                  item.products.map((product: any) => (
                    <View key={product._id} style={{ marginVertical: 5 }}>
                      <Text>Product Name: {product.name}</Text>
                      <Text>Quantity: {product.quantity}</Text>
                      <Text>Price: ₹{product.price}</Text>
                    </View>
                  ))
                ) : (
                  <Text>No products found for this order</Text>
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default OrderHistory;
