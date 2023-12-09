/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { viewRecipeDetails } from '../../api/mergedData';
import InstructionCard from '../../components/InstructionCard';
import { getRecipeNotes } from '../../api/noteData';
import NoteCard from '../../components/NoteCard';
import { useAuth } from '../../utils/context/authContext';

export default function ViewRecipe() {
  const { user } = useAuth();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipeNotes, setRecipeNotes] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [note, setNote] = useState(false);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getRDetails = async () => {
    const viewRecipeData = await viewRecipeDetails(firebaseKey);
    const sortedInstructions = await viewRecipeData.instructions?.sort((a, b) => a.step - b.step);
    const noteData = await getRecipeNotes(user.uid, firebaseKey);

    setRecipeDetails(viewRecipeData);
    setInstructions(sortedInstructions);
    if (note) {
      setRecipeNotes(noteData);
    }
  };
  console.warn(recipeDetails);
  const savedNotes = async () => {
    const checkRecipes = await getRecipeNotes(user.uid, firebaseKey);
    if (checkRecipes) {
      setNote(true);
    }
  };
  useEffect(() => {
    savedNotes();
    getRDetails();
  }, [note]);
  return (
    <>
      <div className="mt-5 d-flex flex-wrap recipeBorder">
        <div className="d-flex flex-column">
          <img className="recipeImage" src={recipeDetails.image} alt={recipeDetails.name} style={{ width: '350px', height: '450px' }} />
        </div>
        <div className="text-white viewRecipe ms-5 details">

          <h1 className="viewRecipeTitle">{recipeDetails.name}</h1>
          <p className="card-text bold">Author: {recipeDetails.author}</p>
          <p className="card-text bold"><span className="seasonDish"> Seasonal Dish:</span> {recipeDetails.season}</p>
          <p className="card-text bold ingredientsTwo">Ingredients: {recipeDetails.ingredients}</p>
          <p className="card-text bold"><span className="description"> Description:</span> {recipeDetails.description}</p>
          <p className="card-text bold">Type: {recipeDetails.type} {recipeDetails.uid === user.uid
            ? (
              <div>
                <Link href={`/recipe/edit/${recipeDetails.firebaseKey}`} passHref>
                  <FontAwesomeIcon className="recipeType" icon={faPenToSquare} size="xl" alt="edit" style={{ color: '#e7b913' }} />
                </Link>
              </div>
            ) : ''}
          </p>
        </div>

      </div>

      <div>{instructions?.map((instruction) => (
        <InstructionCard key={instruction.firebaseKey} instructionObj={instruction} onUpdate={getRDetails} />
      ))}
      </div>
      {recipeDetails.uid === user.uid
        ? (
          <div>
            <div className="recipeBorder">
              <Link passHref href={`/instruction/add/${recipeDetails.firebaseKey}`}><Button className="editBtn m-2" size="sm" style={{ fontSize: '12px' }} variant="outline-secondary">Add</Button>
              </Link>
            </div>
          </div>
        ) : ''}

      <div>{recipeNotes?.map((recipeNote) => (
        <NoteCard key={recipeNote.firebaseKey} noteObj={recipeNote} onUpdate={getRDetails} />
      ))}
      </div>

      {note ? (
        <div>
          <Link passHref href={`/note/add/${recipeDetails.firebaseKey}`}><Button className="listBtn editBtn m-2">ADD A NOTE!</Button>
          </Link>
        </div>
      ) : ''}

      <Link passHref href="/myRecipes">
        <Button className="m-2" variant="outline-dark"><FontAwesomeIcon icon={faRotateLeft} size="xl" style={{ color: '#31363f' }} /></Button>
      </Link>
    </>
  );
}
