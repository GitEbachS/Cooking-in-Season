import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getNotes = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes.json?orderBy="uid"&equalTo="${uid}"`, {
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

const createNote = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleNote = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleNote = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateNote = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getRecipeNotes = (uid, recipeId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filteredNotes = Object.values(data).filter((note) => note.recipeId === recipeId);
      resolve(filteredNotes);
    })
    .catch(reject);
});

export {
  getNotes,
  createNote,
  getSingleNote,
  deleteSingleNote,
  updateNote,
  getRecipeNotes,
};
