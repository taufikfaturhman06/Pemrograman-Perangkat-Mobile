import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const Item = ({item, onUpdate, onDelete}) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>Name: {item.name}</Text>
    <Text style={styles.itemText}>Stock: {item.stock}</Text>
    <Text style={styles.itemText}>Description: {item.description}</Text>
    <Text style={styles.itemText}>Price: ${item.price.toFixed(2)}</Text>
    <View style={styles.buttonContainer}>
      <Button title="Update" onPress={() => onUpdate(item)} />
      <Button title="Delete" color="red" onPress={() => onDelete(item.id)} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Item;
