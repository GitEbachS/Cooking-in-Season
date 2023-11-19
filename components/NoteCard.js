/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { faTrashCan, faPenToSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleNote } from '../api/noteData';

function NoteCard({ noteObj, onUpdate }) {
  const deleteThisNote = () => {
    if (window.confirm('Delete note?')) {
      deleteSingleNote(noteObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>Note</Card.Title>
        <p className="card-text bold">{noteObj.favorite ? <FontAwesomeIcon icon={faHeart} style={{ color: '#e222b9' }} /> : ''}</p>
        <p className="card-text bold">{noteObj.description}</p>
        <Link href={`/note/edit/${noteObj.firebaseKey}`} passHref>
          <FontAwesomeIcon icon={faPenToSquare} size="lg" alt="edit" style={{ color: '#eba62d' }} />
        </Link>
        <FontAwesomeIcon onClick={deleteThisNote} icon={faTrashCan} size="lg" style={{ color: '#5a9ce2' }} />
      </Card.Body>
    </Card>
  );
}

NoteCard.propTypes = {
  noteObj: PropTypes.shape({
    recipeId: PropTypes.string,
    favorite: PropTypes.bool,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NoteCard;
