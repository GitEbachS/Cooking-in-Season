/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { viewRecipeDetails } from '../../api/mergedData';
import InstructionCard from '../../components/InstructionCard';

export default function ViewRecipe() {
  const [recipeDetails, setRecipeDetails] = useState({});
  // const [instruction, setInstruction] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getRDetails = () => {
    viewRecipeDetails(firebaseKey).then(setRecipeDetails);
  };

  useEffect(() => {
    getRDetails();
  }, []);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={recipeDetails.image} alt={recipeDetails.name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h1>{recipeDetails.name}</h1>
          <p className="card-text bold">{recipeDetails.isPrivate ? ' Private' : 'Public'}</p>
          <p className="card-text bold">{recipeDetails.author}</p>
          <p className="card-text bold">{recipeDetails.season}</p>
          <p className="card-text bold">{recipeDetails.ingredients}</p>
          <p className="card-text bold">{recipeDetails.description}</p>
          <p className="card-text bold">{recipeDetails.type}</p>
          <div className="wrapper">
            <Link href={`/recipe/${recipeDetails.firebaseKey}`} passHref>
              <Button variant="primary" className="viewBtn m-2">VIEW</Button>
            </Link>
            <Link href={`/recipe/edit/${recipeDetails.firebaseKey}`} passHref>
              <Button className="editBtn m-2" variant="info">EDIT</Button>
            </Link>
          </div>
        </div>
      </div>

      <div>{recipeDetails.instructions?.map((instruction) => (
        <InstructionCard key={instruction.firebaseKey} instructionObj={instruction} onUpdate={getRDetails} />
      ))}
      </div>
    </>
  );
}
