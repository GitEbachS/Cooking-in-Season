import { deleteSingleInstruction } from './instructionsData';
import { deleteMySingleRecipe, getMyRecipeById, getMyRecipes } from './myRecipes';
import { deleteSingleNote, getRecipeNotes } from './noteData';
import { deleteSingleRecipe, getRecipeInstructions, getSingleRecipe } from './recipeData';

const viewRecipeDetails = (recipeFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleRecipe(recipeFirebaseKey), getRecipeInstructions(recipeFirebaseKey)])
    .then(([recipeObject, recipeInstructionsArray]) => {
      resolve({ ...recipeObject, instructions: recipeInstructionsArray });
    }).catch((error) => reject(error));
});
const deleteRecipeNotes = (recipeId, uid) => new Promise((resolve, reject) => {
  getRecipeNotes(recipeId, uid).then((notesArray) => {
    const deleteNotePromises = notesArray.map((note) => deleteSingleNote(note.firebaseKey));

    Promise.all(deleteNotePromises).then(resolve);
  }).catch((error) => reject(error));
});

const deleteRecipeInstructions = (recipeId, uid) => new Promise((resolve, reject) => {
  getRecipeInstructions(recipeId).then((instructionsArray) => {
    const deleteIngredientPromises = instructionsArray.map((instruction) => deleteSingleInstruction(instruction.firebaseKey));

    const deleteNote = getRecipeNotes(uid, recipeId).then((noteArray) => noteArray.map((note) => deleteSingleNote(note.firebaseKey)));

    Promise.all(deleteIngredientPromises, deleteNote).then(() => {
      deleteSingleRecipe(recipeId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const deleteMyRecipe = (recipeId) => new Promise((resolve, reject) => {
  getMyRecipeById(recipeId).then((myRecipesArray) => {
    const deleteRecipePromises = myRecipesArray.map((recipe) => deleteMySingleRecipe(recipe.firebaseKey));

    Promise.all(deleteRecipePromises).then(resolve);
  }).catch((error) => reject(error));
});
const getMyRecipesDetails = (uid) => new Promise((resolve, reject) => {
  getMyRecipes(uid).then((myRecipesArray) => {
    const myRec = myRecipesArray.map((recipe) => getSingleRecipe(recipe.recipeId));
    Promise.all(myRec).then((data) => resolve(Object.values(data)));
  }).catch((error) => reject(error));
});

const deleteMyRecipeNotes = (recipeId, uid) => new Promise((resolve, reject) => {
  getRecipeNotes(recipeId, uid).then((noteArray) => {
    const deleteSingleNotePromises = noteArray.map((note) => deleteSingleNote(note.firebaseKey));
    Promise.all(deleteSingleNotePromises).then(() => {
      deleteMySingleRecipe(recipeId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewRecipeDetails, deleteMyRecipeNotes, getMyRecipesDetails, deleteMyRecipe, deleteRecipeNotes, deleteRecipeInstructions,
};
