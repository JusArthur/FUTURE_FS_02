require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); 

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    return seedData();
  })
  .then(() => {
    console.log('Seed data inserted successfully!');
    process.exit(); 
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

async function seedData() {
  await Recipe.deleteMany({});

  const recipes = [
    {
      title: 'Spaghetti Carbonara',
      ingredients: [
        'Spaghetti',
        'Pancetta',
        'Eggs',
        'Parmesan Cheese',
        'Black Pepper'
      ],
      steps: [
        'Boil the spaghetti until al dente.',
        'Fry pancetta in a pan until crisp.',
        'Whisk eggs with grated Parmesan cheese and black pepper.',
        'Combine hot spaghetti with pancetta and egg mixture.',
        'Serve immediately.'
      ],
      image: 'https://www.allrecipes.com/thmb/zJzTLhtUWknHXVoFIzysljJ9wR8=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg',
      cuisine: 'Italian',
      difficulty: 'Medium',
      user_id: 'seedUser'
    },
    {
      title: 'Kung Pao Chicken',
      ingredients: [
        'Chicken Breast',
        'Dried Chili Peppers',
        'Peanuts',
        'Garlic',
        'Soy Sauce',
        'Vinegar'
      ],
      steps: [
        'Marinate chicken in soy sauce and cornstarch.',
        'Stir-fry dried chili peppers, garlic, and chicken.',
        'Add sauce mixture and peanuts.',
        'Cook until sauce thickens.',
        'Serve hot with steamed rice.'
      ],
      image: 'https://www.chilipeppermadness.com/wp-content/uploads/2021/03/Kung-Pao-Chicken-Recipe3a.webp',
      cuisine: 'Chinese',
      difficulty: 'Medium',
      user_id: 'seedUser'
    },
    {
      title: 'Tandoori Chicken',
      ingredients: [
        'Chicken Legs',
        'Yogurt',
        'Tandoori Masala',
        'Lemon Juice',
        'Garlic',
        'Ginger'
      ],
      steps: [
        'Marinate chicken with yogurt, tandoori masala, garlic, ginger, and lemon juice.',
        'Let it rest in the fridge for at least 4 hours.',
        'Preheat oven to 200°C.',
        'Bake or grill the chicken until fully cooked.',
        'Garnish with lemon wedges and coriander.'
      ],
      image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2022/12/Tandoori-Chicken-1.jpg',
      cuisine: 'Indian',
      difficulty: 'Hard',
      user_id: 'seedUser'
    },
    {
      title: 'Pad Thai',
      ingredients: [
        'Rice Noodles',
        'Shrimp or Tofu',
        'Bean Sprouts',
        'Eggs',
        'Tamarind Paste',
        'Fish Sauce',
        'Peanuts'
      ],
      steps: [
        'Soak rice noodles in warm water until soft.',
        'Stir-fry shrimp or tofu with garlic.',
        'Push aside and scramble eggs in the pan.',
        'Add noodles, tamarind paste, fish sauce, and sugar.',
        'Mix in bean sprouts and top with crushed peanuts.'
      ],
      image: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1220,h_915/k%2FPhoto%2FRecipes%2F2024-04-pad-thai-190%2Fpad-thai-190-251',
      cuisine: 'Thai',
      difficulty: 'Medium',
      user_id: 'seedUser'
    },
    {
      title: 'Guacamole',
      ingredients: [
        'Avocados',
        'Onion',
        'Tomato',
        'Lime Juice',
        'Cilantro',
        'Salt'
      ],
      steps: [
        'Mash avocados in a bowl.',
        'Add chopped onion, tomato, cilantro, and lime juice.',
        'Season with salt and mix well.',
        'Serve with tortilla chips or as a side dish.'
      ],
      image: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1220,h_915/k%2FPhoto%2FRecipes%2F2024-01-how-to-make-guacamole%2Fguacamole-0664',
      cuisine: 'Mexican',
      difficulty: 'Easy',
      user_id: 'seedUser'
    },
    {
      title: 'Sushi Rolls',
      ingredients: [
        'Sushi Rice',
        'Nori Sheets',
        'Fish or Vegetables',
        'Rice Vinegar',
        'Soy Sauce',
        'Wasabi'
      ],
      steps: [
        'Cook sushi rice and season with rice vinegar.',
        'Lay nori on a bamboo mat and spread rice evenly.',
        'Add fish or vegetables in the center.',
        'Roll tightly and slice into pieces.',
        'Serve with soy sauce and wasabi.'
      ],
      image: 'https://int.japanesetaste.com/cdn/shop/articles/how-to-make-makizushi-sushi-rolls-japanese-taste.jpg?v=1707914944&width=2240',
      cuisine: 'Japanese',
      difficulty: 'Hard',
      user_id: 'seedUser'
    },
    {
      title: 'French Toast',
      ingredients: [
        'Bread',
        'Eggs',
        'Milk',
        'Cinnamon',
        'Butter',
        'Maple Syrup'
      ],
      steps: [
        'Whisk eggs, milk, and cinnamon together.',
        'Dip bread slices in the mixture.',
        'Cook on a buttered pan until golden brown on both sides.',
        'Serve with maple syrup.'
      ],
      image: 'https://cdn.loveandlemons.com/wp-content/uploads/2024/08/french-toast.jpg',
      cuisine: 'French',
      difficulty: 'Easy',
      user_id: 'seedUser'
    },
    {
      title: 'Hamburger',
      ingredients: [
        'Ground Beef',
        'Salt',
        'Pepper',
        'Buns',
        'Lettuce',
        'Tomato',
        'Cheese'
      ],
      steps: [
        'Season ground beef with salt and pepper, form patties.',
        'Grill patties until desired doneness.',
        'Assemble on buns with lettuce, tomato, cheese, and condiments.',
        'Serve hot.'
      ],
      image: 'https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe03.jpg',
      cuisine: 'American',
      difficulty: 'Easy',
      user_id: 'seedUser'
    },
    {
      title: 'Paella',
      ingredients: [
        'Rice',
        'Chicken',
        'Chorizo',
        'Shrimp',
        'Saffron',
        'Bell Peppers',
        'Onion'
      ],
      steps: [
        'Sauté chicken and chorizo with onions and peppers.',
        'Add rice and saffron-infused stock.',
        'Let it simmer until rice is almost done.',
        'Add shrimp on top and cook until pink.',
        'Serve hot with lemon wedges.'
      ],
      image: 'https://www.simplyrecipes.com/thmb/q3Jww3ca9JlybaM1vR00Afyx4yI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__07__Seafood-Paella-HORIZONTAL-ce4d8fe93ec045c0a868ec065f49800a.jpg',
      cuisine: 'Spanish',
      difficulty: 'Medium',
      user_id: 'seedUser'
    },
    {
      title: 'Pho',
      ingredients: [
        'Rice Noodles',
        'Beef Broth',
        'Beef Slices',
        'Onion',
        'Ginger',
        'Basil',
        'Bean Sprouts'
      ],
      steps: [
        'Simmer beef broth with charred onion and ginger.',
        'Cook rice noodles separately.',
        'Place noodles in a bowl, top with raw beef slices.',
        'Pour hot broth over to cook the beef.',
        'Garnish with basil, bean sprouts, and lime.'
      ],
      image: 'https://i0.wp.com/coopcancook.com/wp-content/uploads/2023/11/Photo-Nov-14-2023-11-15-24-AM.jpg?w=1365&ssl=1',
      cuisine: 'Vietnamese',
      difficulty: 'Medium',
      user_id: 'seedUser'
    }
  ];

  await Recipe.insertMany(recipes);
}
