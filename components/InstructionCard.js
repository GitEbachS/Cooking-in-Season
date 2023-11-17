import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleInstruction } from '../api/instructionsData';

function InstructionCard({ instructionObj, onUpdate }) {
  const deleteThisInstruction = () => {
    if (window.confirm('Delete note?')) {
      deleteSingleInstruction(instructionObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card.Title>{instructionObj.step > 1 ? '' : 'Instructions'}</Card.Title>
      <p className="card-text bold">Step {instructionObj.step}:</p>
      <p className="card-text bold">{instructionObj.instruction}</p>
      <Link href={`/instruction/edit/${instructionObj.firebaseKey}`} passHref>
        <Button variant="info">EDIT</Button>
      </Link>
      <Button variant="danger" onClick={deleteThisInstruction} className="m-2">
        DELETE
      </Button>
    </div>
  );
}

InstructionCard.propTypes = {
  instructionObj: PropTypes.shape({
    recipeId: PropTypes.string,
    step: PropTypes.number,
    instruction: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default InstructionCard;
