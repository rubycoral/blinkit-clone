import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import UserIcon from '../assets/icons/userIcon';
import CartIcon from '../assets/icons/cartIcon'
import SearchIcon from '../assets/icons/searchIcon';
import { useNavigation } from '@react-navigation/native';

const Header = ({ address, onAddressPress }: { address: string; onAddressPress: () => void }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.headerContainer}>
      {/* Top: Address + User Icon */}
      <TouchableOpacity onPress={onAddressPress} style={styles.addressContainer}>
        <Text style={styles.deliveryText}>Deliver to</Text>
        <Text style={styles.addressText}>{address}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.userIcon} onPress={() => navigation.navigate('Profile')}>
        <UserIcon />
      </TouchableOpacity>

      <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
        <CartIcon />
      </TouchableOpacity>

      {/* Bottom: Search Bar with SVG Icon */}
      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <SearchIcon />
        </View>
        <TextInput
          placeholder="Search for fruits, snacks, groceries..."
          style={styles.searchBox}
          placeholderTextColor="#888"
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
  addressContainer: {
    marginBottom: 8,
  },
  deliveryText: {
    fontSize: 12,
    color: '#555',
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  cartIcon: {
    position: 'absolute',
    top: 50,
    right: 16,
  },
  userIcon: {
    position: 'absolute',
    top: 50,
    right: 55,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBox: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
});
