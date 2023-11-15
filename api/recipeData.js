import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getRecipes = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recipes.json?orderBy="uid"&equalTo="${uid}"`, {
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

const getAllMemberRecipes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recipes.json`, {
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

const createRecipe = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recipes.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recipes/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recipes/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const updateRecipe = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recipes/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const privateRecipes = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recipes.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filteredRecipes = Object.values(data).filter((item) => item.isPrivate);
      resolve(filteredRecipes);
    })
    .catch(reject);
});

const getRecipeInstructions = (recipeFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/instructions.json?orderBy="recipeId"&equalTo="${recipeFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getRecipes, getAllMemberRecipes, createRecipe, getSingleRecipe, deleteSingleRecipe, updateRecipe, getRecipeInstructions, privateRecipes,
};
