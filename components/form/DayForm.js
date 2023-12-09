import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createDay, updateDay } from '../../api/dayData';
import { getMyRecipesDetails } from '../../api/mergedData';

const initialState = {
  day: '',
  week: '',
  recipeId: '',
};

function DayForm({ dayObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });

  useEffect(() => {
    getMyRecipesDetails(user.uid).then(setRecipes);
    if (dayObj.firebaseKey) setFormInput(dayObj);
  }, [dayObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleChangeTwo = (e) => {
  //   const { name, value } = e.target;
  //   setRecipeInput((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dayObj.firebaseKey) {
      updateDay(formInput).then(() => router.push('/days'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createDay(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateDay(patchPayload).then(() => router.push('/days'));
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{dayObj.firebaseKey ? 'Update' : 'Create'} Rotation Day</h2>

      {/* DAY INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Day of the Week" className="mb-3">
        <Form.Select
          aria-label="Day"
          name="day"
          onChange={handleChange}
          className="mb-3"
          value={formInput.day}
          required
        >
          <option value="">Select a Day</option>
          <option>Sunday</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </Form.Select>
      </FloatingLabel>

      {/* WEEK INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Week of Rotation" className="mb-3">
        <Form.Select
          aria-label="Week"
          name="week"
          onChange={handleChange}
          className="mb-3"
          value={formInput.week}
          required
        >
          <option value="">Week:</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </Form.Select>
      </FloatingLabel>
      {recipes ? (
        <FloatingLabel controlId="floatingSelect" label="Recipe">
          <Form.Select
            aria-label="Recipe"
            name="recipeId"
            onChange={handleChange}
            className="mb-3"
            value={formInput.recipeId}
            required
          >
            <option value="">Select your recipe</option>
            {
            recipes.map((recipe) => (
              <option
                key={recipe.firebaseKey}
                value={recipe.firebaseKey}
              >
                {recipe.name}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>
      ) : ''}
      {/* SUBMIT BUTTON  */}
      <Button className="createBtn" type="submit">{dayObj.firebaseKey ? 'Update' : 'Create'} Recipe</Button>
    </Form>
  );
}

DayForm.propTypes = {
  dayObj: PropTypes.shape({
    day: PropTypes.string,
    week: PropTypes.string,
    recipeId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

DayForm.defaultProps = {
  dayObj: initialState,
};

export default DayForm;
