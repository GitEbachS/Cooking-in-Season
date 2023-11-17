import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createNote, updateNote } from '../../api/noteData';

const initialState = {
  favorite: '',
  description: '',
};

export default function NoteForm({ noteObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [formInput, setFormInput] = useState({ ...initialState, recipeId: firebaseKey });

  useEffect(() => {
    if (noteObj.firebaseKey) setFormInput(noteObj);
  }, [noteObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (noteObj.firebaseKey) {
      updateNote(formInput).then(() => router.back());
      // console.warn('Hi');
    } else {
      const payload = { ...formInput, uid: user.uid };
      createNote(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateNote(patchPayload).then(() => router.push('/myRecipes'));
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{noteObj.firebaseKey ? 'Update' : 'Create'} Note</h2>
        <Form.Group className="mb-3">
          <Form.Label>Favorite?</Form.Label>
          <Form.Check
            className="text-white mb-3"
            type="switch"
            id="favorite"
            name="favorite"
            label="Favorite"
            aria-label="Favorite"
            checked={formInput.favorite}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                favorite: e.target.checked,
              }));
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: '100px' }}
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="outline-secondary" type="submit">
          {noteObj.firebaseKey ? 'Update' : 'Create'} Note
        </Button>
      </Form>
    </>
  );
}

NoteForm.propTypes = {
  noteObj: PropTypes.shape({
    recipeId: PropTypes.string,
    favorite: PropTypes.bool,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

NoteForm.defaultProps = {
  noteObj: initialState,
};
