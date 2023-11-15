import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getInstructions = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/instructions.json`, {
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

const createInstructions = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/instructions.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleInstruction = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/instructions/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getInstructionsByRecipe = (recipeId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/instructions.json?orderBy="recipeId"&equalTo="${recipeId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const deleteSingleInstruction = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/instructions/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateInstructions = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/instructions/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getInstructions,
  createInstructions,
  getInstructionsByRecipe,
  getSingleInstruction,
  deleteSingleInstruction,
  updateInstructions,
};
