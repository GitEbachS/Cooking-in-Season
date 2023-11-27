import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMyRecipes = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/myRecipes.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createMyRecipes = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/myRecipes.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getMySingleRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/myRecipes/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteMySingleRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/myRecipes/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
const updateMyRecipe = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/myRecipes/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getMyRecipeById = (recipeId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/myRecipes.json?orderBy="recipeId"&equalTo="${recipeId}"`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getMyRecipes, getMyRecipeById, createMyRecipes, getMySingleRecipe, deleteMySingleRecipe, updateMyRecipe,
};
