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
  const [note, setNote] = useState(false);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getRDetails = async () => {
    const recipeInstructionArray = await viewRecipeDetails(firebaseKey);
    const noteData = await getRecipeNotes(user.uid, firebaseKey);

    setRecipeDetails(recipeInstructionArray);
    if (note) {
      setRecipeNotes(noteData);
    }
  };

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
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={recipeDetails.image} alt={recipeDetails.name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          {recipeDetails.uid === user.uid
            ? (
              <div>
                <Link href={`/recipe/edit/${recipeDetails.firebaseKey}`} passHref>
                  <FontAwesomeIcon icon={faPenToSquare} size="xl" alt="edit" style={{ color: '#eba62d' }} />
                </Link>
              </div>
            ) : ''}

          <h1>{recipeDetails.name}</h1>
          <p className="card-text bold">Author: {recipeDetails.author}</p>
          <p className="card-text bold">Seasonal Dish: {recipeDetails.season}</p>
          <p className="card-text bold">Ingredients: {recipeDetails.ingredients}</p>
          <p className="card-text bold">Description: {recipeDetails.description}</p>
          <p className="card-text bold">Type: {recipeDetails.type}</p>
        </div>
      </div>

      <div>{recipeDetails.instructions?.map((instruction) => (
        <InstructionCard key={instruction.firebaseKey} instructionObj={instruction} onUpdate={getRDetails} />
      ))}
      </div>
      {recipeDetails.uid === user.uid
        ? (
          <div>
            <div>
              <Link passHref href={`/instruction/add/${recipeDetails.firebaseKey}`}><Button className="editBtn m-2" size="sm" style={{ fontSize: '22px' }} variant="outline-secondary">+</Button>
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
          <Link passHref href={`/note/add/${recipeDetails.firebaseKey}`}><Button className="editBtn m-2" variant="outline-success">Create your note!</Button>
          </Link>
        </div>
      ) : ''}

      <Link passHref href="/myRecipes">
        <Button className="m-2" variant="outline-dark"><FontAwesomeIcon icon={faRotateLeft} size="xl" style={{ color: '#31363f' }} /></Button>
      </Link>
    </>
  );
}
