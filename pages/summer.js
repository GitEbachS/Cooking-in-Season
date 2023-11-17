import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { privateRecipes } from '../api/recipeData';
import RecipeCard from '../components/RecipeCard';

function FilteredSummerRecipes() {
  const [summerRecipes, setSummerRecipes] = useState([]);
  const { user } = useAuth();

  const getSummerRecipes = () => {
    privateRecipes(user.uid).then((privateItems) => {
      const filteredSummer = privateItems.filter((privateItem) => privateItem.season === 'Summer');
      setSummerRecipes(filteredSummer);
    });
  };

  useEffect(() => {
    getSummerRecipes();
  }, [user]);

  return (
    <div className="text-center my-4">
      <h1>SUMMER RECIPES</h1>
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
        {summerRecipes.map((summerRecipe) => (
          <RecipeCard key={summerRecipe.firebaseKey} recipeObj={summerRecipe} onUpdate={getSummerRecipes} />
        ))}

      </div>
      <Button variant="outline-secondary" type="button" size="sm" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
export default FilteredSummerRecipes;
