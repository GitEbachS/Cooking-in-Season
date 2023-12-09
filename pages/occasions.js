import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RecipeCard from '../components/RecipeCard';
import { getAllMemberRecipes } from '../api/recipeData';

function OccasionRecipes() {
  const [occasions, setOccasions] = useState([]);
  const { user } = useAuth();

  const getTheOccasions = () => {
    getAllMemberRecipes().then((allRecipes) => {
      const filteredOccasion = allRecipes.filter((allRecipe) => allRecipe.type === 'Occasions');
      setOccasions(filteredOccasion);
    });
  };

  useEffect(() => {
    getTheOccasions();
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
        {occasions?.map((occasion) => (
          <RecipeCard key={occasion.firebaseKey} recipeObj={occasion} onUpdate={getTheOccasions} />
        ))}

      </div>
      <Button variant="outline-secondary" type="button" size="sm" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
export default OccasionRecipes;
