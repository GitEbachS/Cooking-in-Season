import { deleteSingleInstruction } from './instructionsData';
import { deleteSingleRecipe, getRecipeInstructions, getSingleRecipe } from './recipeData';

const viewRecipeDetails = (recipeFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleRecipe(recipeFirebaseKey), getRecipeInstructions(recipeFirebaseKey)])
    .then(([recipeObject, recipeInstructionsArray]) => {
      resolve({ ...recipeObject, instructions: recipeInstructionsArray });
    }).catch((error) => reject(error));
});

const deleteRecipeInstructions = (recipeId) => new Promise((resolve, reject) => {
  getRecipeInstructions(recipeId).then((instructionsArray) => {
    console.warn(instructionsArray, 'Recipe Ingredients');
    const deleteIngredientPromises = instructionsArray.map((instruction) => deleteSingleInstruction(instruction.firebaseKey));

    Promise.all(deleteIngredientPromises).then(() => {
      deleteSingleRecipe(recipeId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewRecipeDetails, deleteRecipeInstructions };
