import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faTrashCan, faPenToSquare, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Row } from 'react-bootstrap';
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
    <Container className="recipeCard">
      <Card className="recCard">

        <Row>
          <Col className="imgBackground" xs={4}>
            {onList ? <p className="list">LIST  <FontAwesomeIcon icon={faClipboardList} size="lg" style={{ color: '#587570' }} /></p> : <Button type="button" onClick={addToList} size="sm" className="listBtn" variant="outline-success">ADD TO LIST</Button>}
            <Card.Img variant="top" src={recipeObj.image} alt={recipeObj.name} style={{ height: '200px' }} />
            {onList ? <Button className="removeBtn" type="button" onClick={removeFromList} update="onUpdate" size="sm">Remove from list</Button> : ''}
          </Col>

          <Col xs={6}>
            <Card.Title className="recipeTitle">{recipeObj.name}</Card.Title>
            <p className="card-text bold">By: <span className="author">{recipeObj.author}</span></p>
            <p className="card-text bold"><span className="seasonDish">Seasonal Dish:</span> {recipeObj.season}</p>
            <p className="card-text bold"><span className="ingredients">Ingredients: {recipeObj.ingredients}</span></p>
            <p className="card-text bold"><span className="description">Description:</span> {recipeObj.description}</p>
            <p className="card-text bold"><span className="type">Type: {recipeObj.type}</span></p>

            <div className="wrapper">
              <Link href={`/recipe/${recipeObj.firebaseKey}`} passHref>
                <Button variant="outline-secondary" size="sm" className="viewBtn m-2">Jump to Recipe</Button>
              </Link>
              {recipeObj.uid === user.uid
                ? (
                  <div className="cardBtns">
                    <div className="cardBtnsRight">
                      <Link href={`/recipe/edit/${recipeObj.firebaseKey}`} passHref>
                        <FontAwesomeIcon className="editRecipeLink" icon={faPenToSquare} size="lg" alt="edit" style={{ color: '#eba62d' }} />
                      </Link>
                      <FontAwesomeIcon onClick={deleteThisRecipe} icon={faTrashCan} size="lg" style={{ color: '#c7680f' }} />
                    </div>
                  </div>
                ) : ''}
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
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
