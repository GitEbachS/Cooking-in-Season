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
import { createRecipe, privateRecipes, updateRecipe } from '../api/recipeData';
import { useAuth } from '../utils/context/authContext';

function RecipeCard({ recipeObj, onUpdate }) {
  const { user } = useAuth();
  const [duplicate, setDuplicate] = useState(false);
  const [pRecipes, setPRecipes] = useState([]);
  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeObj.name}?`)) {
      deleteRecipeInstructions(recipeObj.firebaseKey).then(() => onUpdate());
    }
  };

  const addToList = () => {
    const payload = {
      isPrivate: true,
      image: recipeObj.image,
      name: recipeObj.name,
      author: recipeObj.author,
      season: recipeObj.season,
      ingredients: recipeObj.ingredients,
      description: recipeObj.description,
      type: recipeObj.type,
      uid: user.uid,
    };
    createRecipe(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateRecipe(patchPayload);
    });
  };
  const getPRecipes = async () => {
    const personalRecipes = await privateRecipes(user.uid);
    setPRecipes(personalRecipes);
    const pNames = pRecipes.map((item) => item.name);
    const matchedRecipes = pNames.includes(recipeObj.name);
    if (matchedRecipes) {
      setDuplicate(true);
    }
  };

  useEffect(() => {
    getPRecipes();
  }, [recipeObj, pRecipes]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {duplicate ? <p>ADDED  <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: '#38cc42' }} /></p> : <Button type="button" onClick={addToList} className="editBtn m-2" variant="outline-success">ADD TO LIST</Button>}

      <Card.Img variant="top" src={recipeObj.image} alt={recipeObj.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title>{recipeObj.name}</Card.Title>
        {/* <p className="card-text bold">{recipeObj.isPrivate ? ' Private' : 'Public'}</p> */}
        <p className="card-text bold">Author: {recipeObj.author}</p>
        <p className="card-text bold">Seasonal Dish: {recipeObj.season}</p>
        <p className="card-text bold">Ingredients: {recipeObj.ingredients}</p>
        <p className="card-text bold">Description: {recipeObj.description}</p>
        <p className="card-text bold">Type: {recipeObj.type}</p>
        <div className="wrapper">
          <Link href={`/recipe/${recipeObj.firebaseKey}`} passHref>
            <Button variant="outline-success" size="sm" className="viewBtn m-2">VIEW</Button>
          </Link>
          <Link href={`/recipe/edit/${recipeObj.firebaseKey}`} passHref>
            <FontAwesomeIcon icon={faPenToSquare} size="lg" alt="edit" style={{ color: '#eba62d' }} />
          </Link>
          <FontAwesomeIcon onClick={deleteThisRecipe} icon={faTrashCan} size="lg" style={{ color: '#5a9ce2' }} />
        </div>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  recipeObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    isPrivate: PropTypes.bool,
    author: PropTypes.string,
    season: PropTypes.string,
    ingredients: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RecipeCard;
