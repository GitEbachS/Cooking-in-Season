import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RecipeCard from '../components/RecipeCard';
import { getAllMemberRecipes } from '../api/recipeData';

function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  const getAllTheRecipes = () => {
    getAllMemberRecipes().then(setRecipes);
  };

  useEffect(() => {
    getAllTheRecipes();
  }, [user]);

  return (
    <div className="text-center my-4">
      <h1>RECIPES</h1>
      <div className="d-flex flex-wrap">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.firebaseKey} recipeObj={recipe} onUpdate={getAllTheRecipes} />
        ))}

      </div>
      <Button variant="outline-secondary" type="button" size="sm" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
export default AllRecipes;
