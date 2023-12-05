import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import DayCard from '../components/DayCard';
import { useAuth } from '../utils/context/authContext';
import { getDays } from '../api/dayData';

export default function ShowDays() {
  const [weeks, setWeeks] = useState([]);
  // const [days, setDays] = useState([]);
  const { user } = useAuth();

  const getAllTheDays = async () => {
    const map = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
    };
    getDays(user.uid).then(((array) => {
      const filteredDaysByWeeks = array.sort((a, b) => map[a.day] - map[b.day]);
      const filteredWeeks = filteredDaysByWeeks.sort((a, b) => a.week - b.week);
      // setDays(filteredDaysByWeeks);
      setWeeks(filteredWeeks);
    }));
  };

  useEffect(() => {
    getAllTheDays();
  }, [user, weeks]);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/day/new" passHref>
          <Button>Add To Weekly Meal Rotation!</Button>
        </Link>
        {weeks?.map((day) => (
          <DayCard key={day.firebaseKey} dayObj={day} onUpdate={getAllTheDays} />
        ))}
      </div>
    </>
  );
}
