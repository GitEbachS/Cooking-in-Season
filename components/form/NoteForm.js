import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createNote, updateNote } from '../../api/noteData';

const initialState = {
  step: '',
  instruction: '',
};

export default function NoteForm({ noteObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const router = useRouter();

  useEffect(() => {
    if (noteObj.firebaseKey) setFormInput(noteObj);
  }, [noteObj, user]);
  console.warn(noteObj.firebaseKey);
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
      updateNote(formInput).then(() => router.push(`/note/${noteObj.firebaseKey}`));
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
          <Form.Label>Step</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Step Number"
            name="step"
            value={formInput.step}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Instruction</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Instruction"
            style={{ height: '100px' }}
            name="instruction"
            value={formInput.instruction}
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
    step: PropTypes.string,
    instruction: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

NoteForm.defaultProps = {
  noteObj: initialState,
};
