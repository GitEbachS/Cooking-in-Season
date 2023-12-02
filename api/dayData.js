import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getDays = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/days.json?orderBy="uid"&equalTo="${uid}"`, {
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

const createDay = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/days.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleDay = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/days/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleDay = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/days/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const updateDay = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/days/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getRecipesByDay = (uid, recipeId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/days.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filteredDayRecipes = Object.values(data).filter((day) => day.recipeId === recipeId);
      resolve(filteredDayRecipes);
    })
    .catch(reject);
});

const getDayByWeekOne = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/days.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filteredWeekOne = Object.values(data).filter((day) => day.week === '1');
      resolve(filteredWeekOne);
    })
    .catch(reject);
});

const getDayByWeekTwo = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/days.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filteredWeekOne = Object.values(data).filter((day) => day.week === '2');
      resolve(filteredWeekOne);
    })
    .catch(reject);
});
export {
  getDays, getDayByWeekOne, getDayByWeekTwo, createDay, getSingleDay, getRecipesByDay, deleteSingleDay, updateDay,
};
