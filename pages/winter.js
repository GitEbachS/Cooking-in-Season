import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RecipeCard from '../components/RecipeCard';
import { getMyRecipesDetails } from '../api/mergedData';

function FilteredWinterRecipes() {
  const [winterRecipes, setWinterRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  const getWRecipes = () => {
    getMyRecipesDetails(user.uid).then(setRecipes);
    const filtered = recipes.filter((item) => item.season === 'Winter');
    setWinterRecipes(filtered);
  };

  useEffect(() => {
    getWRecipes();
  }, [user, recipes]);

  return (
    <div className="text-center my-4">
      <h1>WINTER RECIPES</h1>
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
        {winterRecipes?.map((winterRecipe) => (
          <RecipeCard key={winterRecipe.firebaseKey} recipeObj={winterRecipe} onUpdate={getWRecipes} />
        ))}

      </div>
      <Button variant="outline-secondary" type="button" size="sm" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
export default FilteredWinterRecipes;
