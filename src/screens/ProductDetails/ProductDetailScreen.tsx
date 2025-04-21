import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cartSlice';

const { width } = Dimensions.get('window');

const ProductDetails = ({ route }: any) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart.items);
  const cartItem = cart.find((item: any) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => dispatch(addToCart(product));
  const handleRemove = () => dispatch(removeFromCart({ id: product.id }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={handleRemove}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity style={styles.quantityButton} onPress={handleAdd}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Description Section Below */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: width - 32,
    height: 280,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom:6,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0b8f00',
    marginVertical: 6,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f2ea',
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#cce5d4',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#145a32',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
    color: '#333',
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fdfdfd',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#222',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});
