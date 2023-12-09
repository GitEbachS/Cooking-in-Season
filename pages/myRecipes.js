import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import {
  faLeaf, faSnowflake, faSeedling, faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      <h1 className="myRecipesTitle"><span className="my">MY</span> RECIPES</h1>
      <div>
        <Link passHref href="/fall">
          <Button variant="outline-secondary" type="button" size="sm" className="copy-btn seasonFilterBtn">
            Fall <FontAwesomeIcon icon={faLeaf} style={{ color: '#e29a69' }} />
          </Button>
        </Link>
        <Link passHref href="/winter">
          <Button variant="outline-secondary" type="button" size="sm" className="copy-btn seasonFilterBtn">
            Winter <FontAwesomeIcon icon={faSnowflake} style={{ color: '#6abae2' }} />
          </Button>
        </Link>
        <Link passHref href="/spring">
          <Button variant="outline-secondary" type="button" size="sm" className="copy-btn seasonFilterBtn">
            Spring <FontAwesomeIcon icon={faSeedling} style={{ color: '#36ab49' }} />
          </Button>
        </Link>
        <Link passHref href="/summer">
          <Button variant="outline-secondary" type="button" size="sm" className="copy-btn seasonFilterBtn">
            Summer <FontAwesomeIcon icon={faUmbrellaBeach} style={{ color: '#c6c85b' }} />
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
