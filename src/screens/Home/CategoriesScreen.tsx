import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cartSlice';
import { API_URL, RAZORPAY_KEY } from '@env';

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  subcategory: string;
  description?: string;
};

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get('http://192.168.1.36:5000/products');
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.log('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupedByCategory = products.reduce((acc: Record<string, Product[]>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const getQuantity = (productId: string | number) => {
    const item = cart.find((item: any) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAdd = (item: any) => dispatch(addToCart(item));
  const handleRemove = (item: any) => dispatch(removeFromCart({ id: item.id }));

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10 }}>Loading products...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {Object.keys(groupedByCategory).map((category) => (
        <View key={category} style={styles.section}>
          <Text style={styles.categoryTitle}>{category}</Text>

          <View style={styles.flatListContainer}>
            <FlatList
              data={groupedByCategory[category]}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                const quantity = getQuantity(item.id);

                return (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('ProductDetail', { product: item })}
                  >
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.cardContent}>
                      <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
                      <Text style={styles.price}>₹{item.price}</Text>

                      {/* Quantity Controls */}
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          onPress={(e) => {
                            e.stopPropagation(); // Prevent navigation
                            handleRemove(item);
                          }}
                          style={styles.qtyButton}
                        >
                          <Text style={styles.qtyText}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.qtyValue}>{quantity}</Text>

                        <TouchableOpacity
                          onPress={(e) => {
                            e.stopPropagation(); // Prevent navigation
                            handleAdd(item);
                          }}
                          style={styles.qtyButton}
                        >
                          <Text style={styles.qtyText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <View style={styles.empty}>
                  <Text>No products available</Text>
                </View>
              }
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  section: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  flatListContainer: {
    backgroundColor: '#f0f0f0',  // Background color for FlatList
    borderRadius: 10,  // Optional: round the edges
    padding: 10,  // Padding inside the FlatList
  },
  card: {
    width: 120,
    marginRight: 12,
    alignItems: 'center',
    height: 250,  // Fixed height for the card
    backgroundColor: '#f8f8f8',  // Card background color
    borderRadius: 12,  // Rounded corners
    padding: 10,  // Padding inside the card
    elevation: 5,  // Shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,  // Fixed width
    height: 100,  // Fixed height
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: '#eee',
    resizeMode: 'cover',  // Ensures image covers the area without distortion
  },
  cardContent: {
    width: '100%',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    flex: 1,  // Make sure the content fills the available space
  },
  name: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
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
    paddingHorizontal: 0,
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
  empty: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
