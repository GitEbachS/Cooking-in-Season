/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { viewRecipeDetails } from '../../api/mergedData';
import InstructionCard from '../../components/InstructionCard';
import { getRecipeNotes } from '../../api/noteData';
import NoteCard from '../../components/NoteCard';
import { useAuth } from '../../utils/context/authContext';

export default function ViewRecipe() {
  const { user } = useAuth();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipeNotes, setRecipeNotes] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getRDetails = async () => {
    const recipeInstructionArray = await viewRecipeDetails(firebaseKey);
    const noteData = await getRecipeNotes(user.uid, firebaseKey);
    // const privateRecipesArray = await privateRecipes(uid);
    setRecipeDetails(recipeInstructionArray);
    setRecipeNotes(noteData);
  };

  useEffect(() => {
    getRDetails();
  }, [firebaseKey]);
  console.warn(recipeNotes);
  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={recipeDetails.image} alt={recipeDetails.name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h1>{recipeDetails.name}</h1>
          <Link href={`/recipe/edit/${recipeDetails.firebaseKey}`} passHref>
            <Button className="editBtn m-2" variant="info">EDIT</Button>
          </Link>
          <p className="card-text bold">{recipeDetails.isPrivate ? ' Private' : 'Public'}</p>
          <p className="card-text bold">{recipeDetails.author}</p>
          <p className="card-text bold">{recipeDetails.season}</p>
          <p className="card-text bold">{recipeDetails.ingredients}</p>
          <p className="card-text bold">{recipeDetails.description}</p>
          <p className="card-text bold">{recipeDetails.type}</p>
        </div>
      </div>

      <div>{recipeDetails.instructions?.map((instruction) => (
        <InstructionCard key={instruction.firebaseKey} instructionObj={instruction} onUpdate={getRDetails} />
      ))}
      </div>
      <div>
        <Link passHref href={`/instruction/add/${recipeDetails.firebaseKey}`}><Button className="editBtn m-2" variant="outline-success">ADD A STEP</Button>
        </Link>
      </div>
      {recipeDetails.isPrivate ? (
        <div>{recipeNotes?.map((recipeNote) => (
          <NoteCard key={recipeNote.firebaseKey} noteObj={recipeNote} onUpdate={getRDetails} />
        ))}
        </div>
      ) : ''}
      {recipeDetails.isPrivate ? (
        <div>
          <Link passHref href={`/note/add/${recipeDetails.firebaseKey}`}><Button className="editBtn m-2" variant="outline-success">ADD NOTE</Button>
          </Link>
        </div>
      ) : ''}

      <Link passHref href="/myRecipes">
        <Button className="editBtn m-2" variant="outline-success">BACK</Button>
      </Link>
    </>
  );
}
