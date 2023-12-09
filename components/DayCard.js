import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { deleteSingleDay } from '../api/dayData';
import { viewDayDetails } from '../api/mergedData';

function DayCard({ dayObj, onUpdate }) {
  const [recipe, setRecipe] = useState({});
  const deleteThisDay = () => {
    if (window.confirm(`Delete ${dayObj.day}?`)) {
      deleteSingleDay(dayObj.firebaseKey).then(() => onUpdate());
    }
  };
  useEffect(() => {
    viewDayDetails(dayObj.firebaseKey).then(setRecipe);
  }, [dayObj, recipe]);

  // const getDayRecipeInfo = () => {
  //   getDayDetails(dayObj.firebaseKey).then(setEachRecipe);
  // };
  // useEffect(() => {
  //   getDayRecipeInfo();
  // }, [eachRecipe, dayObj.recipeId]);
  return (
    <Card className="dayCard" style={{ width: '16rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title className="dayName">{dayObj.day}</Card.Title>
        <p className="author">Week: {dayObj.week}</p>
        <h3 className="recipeTitle">{recipe.recipeObject?.name}</h3>

        <Link href={`/recipe/${dayObj.recipeId}`} passHref>
          <Button variant="outline-secondary" className="viewBtn m-2">Jump to Recipe</Button>
        </Link>
        <div className="cardBtnsRight">
          <div className="cardBtns">
            <Link href={`/day/edit/${dayObj.firebaseKey}`} passHref>
              <FontAwesomeIcon className="editRecipeLink" icon={faPenToSquare} size="lg" alt="edit" style={{ color: '#eba62d' }} />
            </Link>
            <FontAwesomeIcon onClick={deleteThisDay} icon={faTrashCan} size="lg" style={{ color: '#c7680f' }} />
          </div>
        </div>

      </Card.Body>
    </Card>
  );
}

DayCard.propTypes = {
  dayObj: PropTypes.shape({
    day: PropTypes.string,
    week: PropTypes.string,
    firebaseKey: PropTypes.string,
    recipeId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default DayCard;
