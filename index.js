// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect MongoDB (Mongoose 7+ 不再需要 useNewUrlParser/useUnifiedTopology)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

/* ================================
   REST API
================================ */

// 1. Upload new recipe (POST /api/recipes)
app.post('/api/recipes', async (req, res) => {
  try {
    const { title, ingredients, steps, image, cuisine, difficulty, user_id } = req.body;
    const newRecipe = new Recipe({ title, ingredients, steps, image, cuisine, difficulty, user_id });
    await newRecipe.save();
    return res.status(201).json(newRecipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// 2. Get all recipes (GET /api/recipes)
// Supports query params: cuisine, difficulty, search
app.get('/api/recipes', async (req, res) => {
  try {
    const { cuisine, difficulty, search } = req.query;
    let filter = {};
    if (cuisine) filter.cuisine = cuisine;
    if (difficulty) filter.difficulty = difficulty;
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
    return res.json(recipes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// 3. Get single recipe detail (GET /api/recipes/:id)
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    return res.json(recipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// 4. Add recipe to favorites (POST /api/users/favorites)
app.post('/api/users/favorites', async (req, res) => {
  try {
    const { user_id, recipe_id } = req.body;
    let user = await User.findById(user_id);
    if (!user) {
      // Create a new user if not exist (for demo)
      user = new User({
        _id: user_id,
        username: `User${user_id}`,
        favorites: []
      });
    }
    if (!user.favorites.includes(recipe_id)) {
      user.favorites.push(recipe_id);
    }
    await user.save();
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// 5. Get user's favorite list (GET /api/users/favorites/:user_id)
app.get('/api/users/favorites/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user.favorites);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

