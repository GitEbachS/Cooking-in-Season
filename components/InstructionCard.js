/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { deleteSingleInstruction } from '../api/instructionsData';
import { useAuth } from '../utils/context/authContext';

function InstructionCard({ instructionObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisInstruction = () => {
    if (window.confirm('Delete step?')) {
      deleteSingleInstruction(instructionObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card.Title>{instructionObj.step > Number('1') ? '' : 'Instructions:'}</Card.Title>
      {instructionObj.uid === user.uid ? (
        <div>
          <Link href={`/instruction/edit/${instructionObj.firebaseKey}`} passHref>
            <FontAwesomeIcon icon={faPenToSquare} size="2xs" style={{ color: '#d312cd' }} />
          </Link>
          <FontAwesomeIcon onClick={deleteThisInstruction} icon={faTrashCan} size="2xs" style={{ color: '#51d260' }} />
        </div>
      ) : ''}
      <span className="card-text bold">  Step {instructionObj.step}:</span>
      <span className="card-text bold"> {instructionObj.instruction}</span>
    </div>
  );
}

InstructionCard.propTypes = {
  instructionObj: PropTypes.shape({
    recipeId: PropTypes.string,
    step: PropTypes.string,
    instruction: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default InstructionCard;
