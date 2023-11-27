import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { createInstructions, updateInstructions } from '../../api/instructionsData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  step: '',
  instruction: '',
};

function InstructionForm({ instructionObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;
  const [formInput, setFormInput] = useState({ ...initialState, recipeId: firebaseKey, uid: user.uid });

  useEffect(() => {
    if (instructionObj.firebaseKey) setFormInput(instructionObj);
  }, [instructionObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (instructionObj.firebaseKey) {
      updateInstructions(formInput).then(() => router.back());
    } else {
      const payload = formInput;
      createInstructions(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateInstructions(patchPayload).then(() => router.reload());
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Link href={`/recipe/${firebaseKey}`} passHref>
        <Button variant="primary" className="viewBtn m-2">See Your Recipe!</Button>
      </Link>
      <h2 className="text-white mt-5">{instructionObj.firebaseKey ? 'Update' : 'Create'} Instruction</h2>

      <FloatingLabel controlId="floatingInput1" label="Step" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Step"
          name="step"
          value={formInput.step}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Instruction" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Instruction"
          name="instruction"
          value={formInput.instruction}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{instructionObj.firebaseKey ? 'Update' : 'Save'} Instruction</Button>
    </Form>
  );
}

InstructionForm.propTypes = {
  instructionObj: PropTypes.shape({
    step: PropTypes.string,
    instruction: PropTypes.string,
    recipeId: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

InstructionForm.defaultProps = {
  instructionObj: initialState,
};

export default InstructionForm;
