import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleInstruction } from '../../../api/instructionsData';
import InstructionForm from '../../../components/form/InstructionForm';

export default function EditInstruction() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleInstruction(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<InstructionForm instructionObj={editItem} />);
}
