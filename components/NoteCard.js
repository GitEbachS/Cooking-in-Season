/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { faTrashCan, faPen, faHeart } from '@fortawesome/free-solid-svg-icons';
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
    <Card className="noteCard" style={{ width: '16rem', margin: '25px' }}>
      <Card.Body>
        <Card.Title className="noteTitle">Note</Card.Title>
        <p className="card-text bold notePosted">Posted: {noteObj.createdAt}</p>
        <p className="card-text bold noteFavorite">Favorite recipe: {noteObj.favorite ? <FontAwesomeIcon icon={faHeart} style={{ color: '#f07ab3' }} /> : ''}</p>
        <p className="card-text bold noteDescription">Description: {noteObj.description}</p>
        <Link href={`/note/edit/${noteObj.firebaseKey}`} passHref>
          <FontAwesomeIcon className="noteEdit" icon={faPen} alt="edit" style={{ color: '#eba62d' }} />
        </Link>
        <FontAwesomeIcon onClick={deleteThisNote} icon={faTrashCan} style={{ color: '#5a9ce2' }} />
      </Card.Body>
    </Card>
  );
}

NoteCard.propTypes = {
  noteObj: PropTypes.shape({
    recipeId: PropTypes.string,
    favorite: PropTypes.bool,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NoteCard;
