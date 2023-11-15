import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { privateRecipes } from '../api/recipeData';
import RecipeCard from '../components/RecipeCard';

function PersonalRecipes() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  const getMyRecipes = () => {
    privateRecipes(user.uid).then(setRecipes);
  };

  useEffect(() => {
    getMyRecipes();
  }, [user]);

  return (
    <div className="text-center my-4">
      <h1>MY RECIPES</h1>
      <div className="d-flex flex-wrap">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.firebaseKey} recipeObj={recipe} onUpdate={getMyRecipes} />
        ))}

      </div>
      <Button variant="outline-secondary" type="button" size="sm" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
export default PersonalRecipes;
