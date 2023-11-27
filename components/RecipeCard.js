import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faTrashCan, faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { deleteRecipeInstructions } from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';
import {
  createMyRecipes, deleteMySingleRecipe, getMyRecipes, updateMyRecipe,
} from '../api/myRecipes';

function RecipeCard({ recipeObj, onUpdate }) {
  const { user } = useAuth();
  const [onList, setOnList] = useState(false);

  const removeFromList = async () => {
    const personalRecipes = await getMyRecipes(user.uid);
    const filtered = await personalRecipes.filter((item) => item.recipeId === recipeObj.firebaseKey);
    setOnList(false);
    deleteMySingleRecipe(filtered[0].firebaseKey);
  };

  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeObj.name}?`)) {
      removeFromList();
      deleteRecipeInstructions(recipeObj.firebaseKey, user.uid).then(() => onUpdate());
    }
  };

  const addToList = () => {
    const payload = {
      recipeId: recipeObj.firebaseKey,
      uid: user.uid,
    };
    createMyRecipes(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateMyRecipe(patchPayload);
      setOnList(true);
    });
  };

  const list = async () => {
    const checkRecipes = await getMyRecipes(user.uid);
    const recipeItem = checkRecipes.map((array) => array.recipeId);
    if (recipeItem.includes(recipeObj.firebaseKey)) {
      setOnList(true);
    }
  };

  useEffect(() => {
    list();
  }, [recipeObj, onList]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {onList ? <p>LIST  <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: '#38cc42' }} /></p> : <Button type="button" onClick={addToList} className="editBtn m-2" variant="outline-success">ADD TO LIST</Button>}
      {onList ? <Button type="button" variant="outline-secondary" onClick={removeFromList} update="onUpdate" size="sm">Remove from list</Button> : ''}

      <Card.Img variant="top" src={recipeObj.image} alt={recipeObj.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title>{recipeObj.name}</Card.Title>
        <p className="card-text bold">Author: {recipeObj.author}</p>
        <p className="card-text bold">Seasonal Dish: {recipeObj.season}</p>
        <p className="card-text bold">Ingredients: {recipeObj.ingredients}</p>
        <p className="card-text bold">Description: {recipeObj.description}</p>
        <p className="card-text bold">Type: {recipeObj.type}</p>
        <div className="wrapper">
          <Link href={`/recipe/${recipeObj.firebaseKey}`} passHref>
            <Button variant="outline-success" size="sm" className="viewBtn m-2">VIEW</Button>
          </Link>
          {recipeObj.uid === user.uid
            ? (
              <div>
                <Link href={`/recipe/edit/${recipeObj.firebaseKey}`} passHref>
                  <FontAwesomeIcon icon={faPenToSquare} size="lg" alt="edit" style={{ color: '#eba62d' }} />
                </Link>
                <FontAwesomeIcon onClick={deleteThisRecipe} icon={faTrashCan} size="lg" style={{ color: '#5a9ce2' }} />
              </div>
            ) : ''}
        </div>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  recipeObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    author: PropTypes.string,
    season: PropTypes.string,
    ingredients: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RecipeCard;
