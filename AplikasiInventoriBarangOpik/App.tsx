import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from 'react-native';
import api from './src/API';
import Item from './src/components/Item';

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    stock: '',
    description: '',
    price: '',
  });
  const [editingItem, setEditingItem] = useState(null);
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get('/');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    if (
      !newItem.name ||
      !newItem.stock ||
      !newItem.description ||
      !newItem.price
    ) {
      Alert.alert('Error', 'Please enter all fields');
      return;
    }
    try {
      const response = await api.post('/', {
        name: newItem.name,
        stock: parseInt(newItem.stock),
        description: newItem.description,
        price: parseFloat(newItem.price),
      });
      setItems([...items, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async () => {
    if (!editingItem) return;
    const updatedItem = {
      ...editingItem,
      name: newItem.name,
      stock: parseInt(newItem.stock),
      description: newItem.description,
      price: parseFloat(newItem.price),
    };
    try {
      await api.put(`/${editingItem.id}`, updatedItem);
      setItems(items.map(i => (i.id === editingItem.id ? updatedItem : i)));
      resetForm();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async id => {
    try {
      await api.delete(`/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const editItem = item => {
    setNewItem({
      name: item.name,
      stock: item.stock.toString(),
      description: item.description,
      price: item.price.toString(),
    });
    setEditingItem(item);
  };

  const resetForm = () => {
    setNewItem({name: '', stock: '', description: '', price: ''});
    setEditingItem(null);
  };

  return (
    <View
      style={[
        styles.container,
        isLandscape && {
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 24,
        },
      ]}>
      <View style={[styles.form, isLandscape && {width: '40%'}]}>
        <Text style={styles.header}>Inventory App</Text>

        <TextInput
          placeholder="Item Name"
          style={styles.input}
          value={newItem.name}
          onChangeText={text => setNewItem({...newItem, name: text})}
        />
        <TextInput
          placeholder="Stock"
          style={styles.input}
          value={newItem.stock}
          onChangeText={text => setNewItem({...newItem, stock: text})}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={newItem.description}
          onChangeText={text => setNewItem({...newItem, description: text})}
        />
        <TextInput
          placeholder="Price"
          style={styles.input}
          value={newItem.price}
          onChangeText={text => setNewItem({...newItem, price: text})}
          keyboardType="numeric"
        />
        {editingItem ? (
          <Button title="Update Item" onPress={updateItem} />
        ) : (
          <Button title="Add Item" onPress={addItem} />
        )}
      </View>

      <View style={[styles.listContainer, isLandscape && {width: '55%'}]}>
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Item item={item} onUpdate={editItem} onDelete={deleteItem} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  form: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default App;
