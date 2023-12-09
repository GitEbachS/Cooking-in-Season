import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RecipeCard from '../components/RecipeCard';
import { getAllMemberRecipes } from '../api/recipeData';

function MealRecipes() {
  const [meals, setMeals] = useState([]);
  const { user } = useAuth();

  const getTheMeals = () => {
    getAllMemberRecipes().then((allRecipes) => {
      const filteredMeal = allRecipes.filter((allRecipe) => allRecipe.type === 'Meals');
      setMeals(filteredMeal);
    });
  };

  useEffect(() => {
    getTheMeals();
  }, [user]);

  return (
    <div className="text-center my-4">
      <h1>RECIPES</h1>
      <Link passHref href="/meals">
        <Button variant="outline-secondary" type="button" size="sm" className="seasonBtn copy-btn">
          Meals
        </Button>
      </Link>
      <Link passHref href="/desserts">
        <Button variant="outline-secondary" type="button" size="sm" className="seasonBtn copy-btn">
          Desserts
        </Button>
      </Link>
      <Link passHref href="/occasions">
        <Button variant="outline-secondary" type="button" size="sm" className="seasonBtn copy-btn">
          Occasions
        </Button>
      </Link>
      <div className="d-flex flex-wrap">
        {meals?.map((meal) => (
          <RecipeCard key={meal.firebaseKey} recipeObj={meal} onUpdate={getTheMeals} />
        ))}

      </div>
      <Button variant="outline-secondary" type="button" size="sm" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
export default MealRecipes;
