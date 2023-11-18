import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { privateRecipes } from '../api/recipeData';
import RecipeCard from '../components/RecipeCard';

function FilteredSpringRecipes() {
  const [springRecipes, setSpringRecipes] = useState([]);
  const { user } = useAuth();

  const getSpringRecipes = () => {
    privateRecipes(user.uid).then((privateItems) => {
      const filteredSpring = privateItems.filter((privateItem) => privateItem.season === 'Spring');
      setSpringRecipes(filteredSpring);
    });
  };

  useEffect(() => {
    getSpringRecipes();
  }, [user]);

  return (
    <div className="text-center my-4">
      <h1>SPRING RECIPES</h1>
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
        {springRecipes.map((springRecipe) => (
          <RecipeCard key={springRecipe.firebaseKey} recipeObj={springRecipe} onUpdate={getSpringRecipes} />
        ))}

      </div>
      <Button variant="outline-secondary" type="button" size="sm" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
export default FilteredSpringRecipes;