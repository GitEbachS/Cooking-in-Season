import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteRecipeInstructions } from '../api/mergedData';
import { updateRecipe } from '../api/recipeData';

function RecipeCard({ recipeObj, onUpdate }) {
  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeObj.name}?`)) {
      deleteRecipeInstructions(recipeObj.firebaseKey).then(() => onUpdate());
    }
  };

  const addToList = () => {
    if (recipeObj.firebaseKey) {
      const patchPayload = { firebaseKey: recipeObj.firebaseKey, isPrivate: true };
      updateRecipe(patchPayload).then(() => onUpdate());
    }
  };
  const removeFromList = () => {
    if (recipeObj.firebaseKey) {
      const patchPayload = { firebaseKey: recipeObj.firebaseKey, isPrivate: false };
      updateRecipe(patchPayload).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {recipeObj.isPrivate ? <Button type="button" onClick={removeFromList} className="editBtn m-2" variant="outline-info">REMOVE FROM LIST</Button> : <Button type="button" onClick={addToList} className="editBtn m-2" variant="outline-success">ADD TO LIST</Button>}
      <Card.Img variant="top" src={recipeObj.image} alt={recipeObj.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title>{recipeObj.name}</Card.Title>
        {/* <p className="card-text bold">{recipeObj.isPrivate ? ' Private' : 'Public'}</p> */}
        <p className="card-text bold">{recipeObj.author}</p>
        <p className="card-text bold">{recipeObj.season}</p>
        <p className="card-text bold">{recipeObj.ingredients}</p>
        <p className="card-text bold">{recipeObj.description}</p>
        <p className="card-text bold">{recipeObj.type}</p>
        <div className="wrapper">
          <Link href={`/recipe/${recipeObj.firebaseKey}`} passHref>
            <Button variant="primary" className="viewBtn m-2">VIEW</Button>
          </Link>
          <Link href={`/recipe/edit/${recipeObj.firebaseKey}`} passHref>
            <Button className="editBtn m-2" variant="info">EDIT</Button>
          </Link>
          <Button variant="warning" onClick={deleteThisRecipe} className="deleteBtn m-2">
            DELETE
          </Button>
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
