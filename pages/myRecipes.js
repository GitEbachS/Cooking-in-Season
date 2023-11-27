import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RecipeCard from '../components/RecipeCard';
import { getMyRecipes } from '../api/myRecipes';
import { getSingleRecipe } from '../api/recipeData';

function PersonalRecipes() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  const getSavedRecipes = async () => {
    const savedRecipes = await getMyRecipes(user.uid);
    const filteredSavedRecipes = await savedRecipes?.map((savedItem) => getSingleRecipe(savedItem.recipeId));
    Promise.all(filteredSavedRecipes).then(setRecipes);
  };

  useEffect(() => {
    getSavedRecipes();
  }, [user, recipes]);

  return (
    <div className="text-center my-4">
      <h1>MY RECIPES</h1>
      <div>
        <Link passHref href="/fall">
          <Button variant="outline-secondary" type="button" size="sm" className="copy-btn">
            Fall
          </Button>
        </Link>
        <Link passHref href="/winter">
          <Button variant="outline-secondary" type="button" size="sm" className="copy-btn">
            Winter
          </Button>
        </Link>
        <Link passHref href="/spring">
          <Button variant="outline-secondary" type="button" size="sm" className="copy-btn">
            Spring
          </Button>
        </Link>
        <Link passHref href="/summer">
          <Button variant="outline-secondary" type="button" size="sm" className="copy-btn">
            Summer
          </Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap">
        {recipes?.map((recipe) => (
          <RecipeCard key={recipe.firebaseKey} recipeObj={recipe} onUpdate={getSavedRecipes} />
        ))}

      </div>
      <Button variant="outline-secondary" type="button" size="sm" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
export default PersonalRecipes;
