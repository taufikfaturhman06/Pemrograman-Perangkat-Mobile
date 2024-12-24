const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let inventory = [
  {
    id: 1,
    name: 'Laptop',
    stock: 15,
    description: 'Laptop gaming high performance',
    price: 1500.0,
  },
  {id: 2, name: 'Mouse', stock: 50, description: 'Wireless mouse', price: 25.0},
  {
    id: 3,
    name: 'Keyboard',
    stock: 30,
    description: 'Mechanical keyboard',
    price: 75.0,
  },
];

app.get('/api/inventory', (req, res) => {
  res.json(inventory);
});

app.post('/api/inventory', (req, res) => {
  const {name, stock, description, price} = req.body;
  const newItem = {
    id: inventory.length + 1,
    name,
    stock,
    description,
    price,
  };
  inventory.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/inventory/:id', (req, res) => {
  const {id} = req.params;
  const {name, stock, description, price} = req.body;
  const itemIndex = inventory.findIndex(item => item.id == id);

  if (itemIndex !== -1) {
    const updatedItem = {id: parseInt(id), name, stock, description, price};
    inventory[itemIndex] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({message: 'Item not found'});
  }
});

app.delete('/api/inventory/:id', (req, res) => {
  const {id} = req.params;
  const itemIndex = inventory.findIndex(item => item.id == id);

  if (itemIndex !== -1) {
    inventory.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({message: 'Item not found'});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
