import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import DayCard from '../components/DayCard';
import { useAuth } from '../utils/context/authContext';
import { getDays } from '../api/dayData';

export default function ShowDays() {
  const [days, setDays] = useState([]);
  const { user } = useAuth();

  const getAllTheDays = async () => {
    // const daysData = await
    getDays(user.uid).then(((array) => {
      const filteredWeeks = array.sort((a, b) => a.week - b.week);
      setDays(filteredWeeks);
    }));
  };

  useEffect(() => {
    getAllTheDays();
  }, [user, days]);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/day/new" passHref>
          <Button>Add To Weekly Meal Rotation!</Button>
        </Link>
        {days?.map((day) => (
          <DayCard key={day.firebaseKey} dayObj={day} onUpdate={getAllTheDays} />
        ))}
      </div>
    </>
  );
}
