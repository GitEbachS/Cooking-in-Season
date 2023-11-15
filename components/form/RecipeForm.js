import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe, updateRecipe } from '../../api/recipeData';

const initialState = {
  image: '',
  name: '',
  isPrivate: false,
  author: '',
  season: '',
  ingredients: '',
  description: '',
  type: '',
};

function RecipeForm({ recipeObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const router = useRouter();

  useEffect(() => {
    if (recipeObj.firebaseKey) setFormInput(recipeObj);
  }, [recipeObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeObj.firebaseKey) {
      updateRecipe(formInput).then(() => router.push(`/recipe/${recipeObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createRecipe(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateRecipe(patchPayload).then(() => router.push(`/recipe/${recipeObj.firebaseKey}`));
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{recipeObj.firebaseKey ? 'Update' : 'Create'} Recipe</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Recipe Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a recipe name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Recipe Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* AUTHOR INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Author Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter author name"
          name="author"
          value={formInput.author}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Season" className="mb-3">
        <Form.Select
          aria-label="Season"
          name="season"
          onChange={handleChange}
          className="mb-3"
          value={formInput.season}
          required
        >
          <option value="">Select a Season</option>
          <option>Fall</option>
          <option>Winter</option>
          <option>Summer</option>
          <option>Spring</option>
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="isPrivate"
        name="isPrivate"
        label="Private?"
        checked={formInput.isPrivate}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            isPrivate: e.target.checked,
          }));
        }}
      />
      <FloatingLabel controlId="floatingInput1" label="Type" className="mb-3">
        <Form.Select
          aria-label="type"
          name="type"
          onChange={handleChange}
          className="mb-3"
          value={formInput.type}
          required
        >
          <option value="">Select a Recipe Type</option>
          <option>Meals</option>
          <option>Desserts</option>
          <option>Occasions</option>
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Link passHref href="/instruction/new">
        <Button type="submit">{recipeObj.firebaseKey ? 'Update' : 'Create'} Recipe</Button>
      </Link>
    </Form>
  );
}

RecipeForm.propTypes = {
  recipeObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    isPrivate: PropTypes.bool,
    type: PropTypes.string,
    season: PropTypes.string,
    ingredients: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

RecipeForm.defaultProps = {
  recipeObj: initialState,
};

export default RecipeForm;