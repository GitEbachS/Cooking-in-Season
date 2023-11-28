import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RecipeCard from '../components/RecipeCard';
import { getMyRecipesDetails } from '../api/mergedData';

function FilteredFallRecipes() {
  const [fallRecipes, setFallRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  const getFRecipes = async () => {
    getMyRecipesDetails(user.uid).then(setRecipes);
    const filtered = recipes.filter((item) => item.season === 'Fall');
    setFallRecipes(filtered);
  };

  useEffect(() => {
    getFRecipes();
  }, [user, recipes]);

  return (
    <div className="text-center my-4">
      <h1>FALL RECIPES!</h1>
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
        {fallRecipes?.map((fallRecipe) => (
          <RecipeCard key={fallRecipe.firebaseKey} recipeObj={fallRecipe} onUpdate={getFRecipes} />
        ))}

      </div>
      <Button variant="outline-secondary" type="button" size="sm" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
export default FilteredFallRecipes;
