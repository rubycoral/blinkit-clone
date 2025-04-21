import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cartSlice';
import { API_URL, RAZORPAY_KEY } from '@env';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      // const res = await axios.get('http://192.168.1.36:5000/products');
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getQuantity = (productId: string | number) => {
    const item = cart.find((item: any) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAdd = (item: any) => dispatch(addToCart(item));
  const handleRemove = (item: any) => dispatch(removeFromCart({ id: item.id }));

  const renderItem = ({ item }: any) => {
    const quantity = getQuantity(item.id);

    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>₹{item.price}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleRemove(item)} style={styles.qtyButton}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyValue}>{quantity}</Text>

            <TouchableOpacity onPress={() => handleAdd(item)} style={styles.qtyButton}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 6,
    color: 'green',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 6,
  },
  qtyButton: {
    backgroundColor: '#c8e6c9',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  qtyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  qtyValue: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    color: '#333',
  },
});
