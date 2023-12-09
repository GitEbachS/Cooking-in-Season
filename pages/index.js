import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
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
      <h1 className="indexTitle">RECIPES</h1>
      <Link passHref href="/meals">
        <Button type="button" size="sm" className="seasonBtn">
          Meals
        </Button>
      </Link>
      <Link passHref href="/desserts">
        <Button type="button" size="sm" className="seasonBtn">
          Desserts
        </Button>
      </Link>
      <Link passHref href="/occasions">
        <Button type="button" size="sm" className="seasonBtn">
          Occasions
        </Button>
      </Link>
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
