let recipes = [];
let currentRecipe = null; 

document.addEventListener('DOMContentLoaded', () => {
  loadRecipes();
  initViewMode();
});

document.getElementById('recipe-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const ingredients = document.getElementById('ingredients').value.split(',').map(item => item.trim());
  const steps = document.getElementById('steps').value.split('\n').map(item => item.trim());
  const image = document.getElementById('image').value.trim();
  const cuisine = document.getElementById('cuisine').value.trim();
  const difficulty = document.getElementById('difficulty').value;
  const user_id = document.getElementById('user_id').value;

  const recipe = { title, ingredients, steps, image, cuisine, difficulty, user_id };

  const res = await fetch('/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  });
  if (res.ok) {
    showToast('Recipe submitted successfully!');
    document.getElementById('recipe-form').reset();
    loadRecipes();
  } else {
    showToast('Error submitting recipe.', 'danger');
  }
});

document.getElementById('filterBtn').addEventListener('click', () => {
  loadRecipes().then(() => {
    document.getElementById('recipesSection').scrollIntoView({ behavior: 'smooth' });
  });
});

document.getElementById('searchInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); 
    document.getElementById('filterBtn').click();
  }
});

function showLoading() {
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;
}

async function loadRecipes() {
  showLoading();
  
  const searchValue = document.getElementById('searchInput').value.trim();
  const cuisineValue = document.getElementById('cuisineFilter').value;
  const difficultyValue = document.getElementById('difficultyFilter').value;

  let query = '/api/recipes?';
  if (searchValue) query += `search=${encodeURIComponent(searchValue)}&`;
  if (cuisineValue) query += `cuisine=${encodeURIComponent(cuisineValue)}&`;
  if (difficultyValue) query += `difficulty=${encodeURIComponent(difficultyValue)}&`;

  try {
    const res = await fetch(query);
    if (!res.ok) throw new Error('加载失败');
    recipes = await res.json();
    displayRecipes();
  } catch (error) {
    document.getElementById('recipe-list').innerHTML = `
      <div class="col-12 text-center py-5 text-danger">
        <i class="bi bi-exclamation-triangle fs-1"></i>
        <p class="mt-3">${error.message}</p>
      </div>`;
  }
}

function displayRecipes() {
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = '';

  recipes.forEach(recipe => {
    const col = document.createElement('div');
    col.className = 'col';

    col.innerHTML = `
      <div class="card h-100">
        ${recipe.image ? `<img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">` : ''}
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <p class="card-text">
            Cuisine: ${recipe.cuisine || 'N/A'}<br>
            Difficulty: ${recipe.difficulty || 'N/A'}
          </p>
        </div>
        <div class="card-footer text-end">
          <button class="btn btn-outline-primary btn-sm" onclick="openRecipeModal('${recipe._id}')">View Details</button>
        </div>
      </div>
    `;
    recipeList.appendChild(col);
  });
}

function setCuisineFilter(cuisine) {
  document.getElementById('cuisineFilter').value = cuisine;
  loadRecipes();
}

function openRecipeModal(id) {
  currentRecipe = recipes.find(r => r._id === id);
  if (!currentRecipe) return;

  const recipeDetails = document.getElementById('recipeDetails');
  recipeDetails.innerHTML = `
    <h3>${currentRecipe.title}</h3>
    ${currentRecipe.image ? `<img src="${currentRecipe.image}" class="img-fluid mb-3" alt="${currentRecipe.title}">` : ''}
    <p><strong>Cuisine:</strong> ${currentRecipe.cuisine || 'N/A'}</p>
    <p><strong>Difficulty:</strong> ${currentRecipe.difficulty}</p>
    <h5>Ingredients:</h5>
    <ul>
      ${currentRecipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    <h5>Steps:</h5>
    <ol>
      ${currentRecipe.steps.map(step => `<li>${step}</li>`).join('')}
    </ol>
  `;

  const modal = new bootstrap.Modal(document.getElementById('recipeModal'));
  modal.show();
}

document.getElementById('addFavoriteBtn').addEventListener('click', async () => {
  if (!currentRecipe) return;
  const user_id = document.getElementById('user_id').value;

  const res = await fetch('/api/users/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, recipe_id: currentRecipe._id })
  });
  if (res.ok) {
    alert('Added to favorites!');
  } else {
    alert('Error adding to favorites.');
  }
});

async function showFavorites() {
  const user_id = document.getElementById('user_id').value;
  const res = await fetch(`/api/users/favorites?user_id=${user_id}`);
  if (res.ok) {
    recipes = await res.json();
    displayRecipes();
    document.getElementById('recipesSection').scrollIntoView({ behavior: 'smooth' });
  }
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${type} border-0`;
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>`;
  
  document.body.appendChild(toast);
  new bootstrap.Toast(toast, { autohide: true, delay: 3000 }).show();
  setTimeout(() => toast.remove(), 3500);
}

// 新增视图切换功能
function toggleViewMode(mode) {
  const list = document.getElementById('recipe-list');
  list.classList.remove('view-grid', 'view-list');
  list.classList.add(`view-${mode}`);
  
  // 保存用户偏好
  localStorage.setItem('recipeViewMode', mode);
}

// 初始化视图模式
function initViewMode() {
  const savedMode = localStorage.getItem('recipeViewMode') || 'grid';
  toggleViewMode(savedMode);
}

// 新增直接收藏功能
async function addToFavoritesDirect(recipeId) {
  const btn = event.currentTarget;
  btn.disabled = true;
  
  try {
    const res = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId })
    });
    
    if (res.ok) {
      btn.innerHTML = `<i class="bi bi-heart-fill"></i>`;
      showToast('已加入收藏', 'success');
    }
  } catch (error) {
    showToast('收藏失败', 'danger');
  } finally {
    btn.disabled = false;
  }
}
