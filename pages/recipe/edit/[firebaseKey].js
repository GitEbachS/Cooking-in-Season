import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeForm from '../../../components/form/RecipeForm';
import { getSingleRecipe } from '../../../api/recipeData';

export default function EditRecipe() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleRecipe(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<RecipeForm recipeObj={editItem} />);
}
