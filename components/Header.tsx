// @/components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#56021F',
    marginTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 50

  },
});

export default Header;