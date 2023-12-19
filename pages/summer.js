/* eslint-disable react-hooks/exhaustive-deps */
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
import { getMyRecipesDetails } from '../api/mergedData';

function FilteredSummerRecipes() {
  const [summerRecipes, setSummerRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  const getSummerRecipes = () => {
    getMyRecipesDetails(user.uid).then(setRecipes);
    const filtered = recipes.filter((item) => item.season === 'Summer');
    setSummerRecipes(filtered);
  };

  useEffect(() => {
    getSummerRecipes();
  }, [user, recipes]);

  return (
    <div className="text-center my-4">
      <h1 className="myRecipesTitle">SUMMER RECIPES</h1>
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
        {summerRecipes?.map((summerRecipe) => (
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
