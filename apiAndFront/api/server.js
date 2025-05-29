const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('🟢 MongoDB conectado'))
  .catch(err => console.error('🔴 Error conectando MongoDB:', err));

const User = require('./models/User');

// Rutas CRUD
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { nombre, edad, dni } = req.body;
  const newUser = new User({ nombre, edad, dni });
  await newUser.save();
  res.status(201).json(newUser);
});

app.put('/users/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Usuario eliminado' });
});

app.listen(3001, () => console.log('🚀 API escuchando en puerto 3001'));
