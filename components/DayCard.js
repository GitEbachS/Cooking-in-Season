import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
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
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{dayObj.day}</Card.Title>
        <p>Week: {dayObj.week}</p>
        <h3>{recipe.recipeObject?.name}</h3>
        <div className="wrapper">
          <Link href={`/recipe/${dayObj.recipeId}`} passHref>
            <Button variant="outline-info" className="viewBtn m-2">VIEW</Button>
          </Link>
          <Link href={`/day/edit/${dayObj.firebaseKey}`} passHref>
            <Button className="editBtn m-2" variant="outline-info">EDIT</Button>
          </Link>
          <Button variant="outline-info" onClick={deleteThisDay} className=" deleteBtn m-2">
            DELETE
          </Button>
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
