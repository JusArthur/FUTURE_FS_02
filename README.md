# Recipe Sharing Website

A simple recipe-sharing website built with modern web technologies. Users can browse, search, and upload recipes(PLS do！♥), filter by cuisine and difficulty, view recipe details in a modal, and add recipes to their favorites.

## Tech Stack

### Frontend

- **HTML5, CSS3, JavaScript** – Core web technologies
- **Bootstrap 5** – Responsive UI components and styling
- **Fetch API** – Client-side HTTP requests

### Backend

- **Node.js & Express.js** – Server-side framework
- **MongoDB & Cloud - Atlas Cluster0** – NoSQL database and ODM for managing recipes

## Features

- **View Recipes** – Browse a collection of recipes with images and details.
- **Search & Filter** – Find recipes by name, cuisine, and difficulty.
- **Smooth Scrolling** – Automatically scrolls to the recipe section after searching.
- **Upload Recipes** – Users can submit their own recipes.
- **Recipe Details Modal** – Displays detailed information inside a Bootstrap modal.
- **Add to Favorites** – Users can save recipes to their favorite list.

## Installation Setup

I learned from `https://www.youtube.com/watch?si=8CQ5okvuHZN_Xs0I&v=OEdPH4fV7vY&feature=youtu.be`
So I am also making it an open source for everybody.

First thing's first: bash - npm install

Set up environment variables: Create a `.env` file in the root directory and add the following:
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000

Seed the database with sample recipes: bash - node seed.js

You're ready to start: bash - npm start

Open in browser:[http://localhost:3000]

## Handy recourses

`https://www.pexels.com/search/background/`

`https://unsplash.com/backgrounds`
