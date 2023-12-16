import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { deleteSingleDay } from '../api/dayData';
import { dayDetails } from '../api/mergedData';

function DayCard({ dayObj, onUpdate }) {
  const [dayInfo, setDayInfo] = useState({});
  const deleteThisDay = () => {
    if (window.confirm(`Delete ${dayObj.day}?`)) {
      deleteSingleDay(dayObj.firebaseKey).then(() => onUpdate());
    }
  };
  useEffect(() => {
    dayDetails(dayObj.firebaseKey).then(setDayInfo);
  }, [dayObj, dayInfo]);

  return (
    <Card className="dayCard" style={{ width: '16rem', margin: '10px' }}>
      <Card.Body className="dayCardBody">
        <Card.Title className="dayName">{dayObj.day}</Card.Title>
        <p className="author">Week: {dayObj.week}</p>
        <h3 className="recipeTitle">{dayInfo.recipeObject?.name}</h3>
        <div><Card.Img variant="" style={{ width: '3.5rem', height: '3.5rem', margin: '5px' }} src={dayInfo.recipeObject?.image} alt={dayInfo.recipeObject?.name} />

          <Link href={`/recipe/${dayObj.recipeId}`} passHref>
            <Button variant="outline-secondary" className="viewBtn m-2">Jump to Recipe</Button>
          </Link>
        </div>

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
