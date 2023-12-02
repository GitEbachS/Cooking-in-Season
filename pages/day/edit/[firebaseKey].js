import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DayForm from '../../../components/form/DayForm';
import { getSingleDay } from '../../../api/dayData';

export default function EditDay() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleDay(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<DayForm dayObj={editItem} />);
}
