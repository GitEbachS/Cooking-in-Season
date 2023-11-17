import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RecipeCard from '../components/RecipeCard';
import { getAllMemberRecipes } from '../api/recipeData';

function DessertRecipes() {
  const [desserts, setDesserts] = useState([]);
  const { user } = useAuth();

  const getTheDesserts = () => {
    getAllMemberRecipes().then((allRecipes) => {
      const filteredDessert = allRecipes.filter((allRecipe) => allRecipe.type === 'Desserts');
      setDesserts(filteredDessert);
    });
  };

  useEffect(() => {
    getTheDesserts();
  }, [user]);

  return (
    <div className="text-center my-4">
      <h1>RECIPES</h1>
      <Link passHref href="/meals">
        <Button variant="outline-secondary" type="button" size="sm" className="copy-btn">
          Meals
        </Button>
      </Link>
      <Link passHref href="/desserts">
        <Button variant="outline-secondary" type="button" size="sm" className="copy-btn">
          Desserts
        </Button>
      </Link>
      <Link passHref href="/occasions">
        <Button variant="outline-secondary" type="button" size="sm" className="copy-btn">
          Occasions
        </Button>
      </Link>
      <div className="d-flex flex-wrap">
        {desserts.map((dessert) => (
          <RecipeCard key={dessert.firebaseKey} recipeObj={dessert} onUpdate={getTheDesserts} />
        ))}

      </div>
      <Button variant="outline-secondary" type="button" size="sm" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
export default DessertRecipes;
