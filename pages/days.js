import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import DayCard from '../components/DayCard';
import { useAuth } from '../utils/context/authContext';
import { getDays } from '../api/dayData';

export default function ShowDays() {
  const [weeks, setWeeks] = useState([]);
  const { user } = useAuth();

  const getAllTheDays = async () => {
    const map = {
      Sunday: 1,
      Monday: 2,
      Tuesday: 3,
      Wednesday: 4,
      Thursday: 5,
      Friday: 6,
      Saturday: 7,
    };
    getDays(user.uid).then(((array) => {
      const filteredDaysByWeeks = array.sort((a, b) => map[a.day] - map[b.day]);
      const filteredWeeks = filteredDaysByWeeks.sort((a, b) => a.week - b.week);
      setWeeks(filteredWeeks);
    }));
  };

  useEffect(() => {
    getAllTheDays();
  }, [user]);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/day/new" passHref>
          <Button className="addDayBtn">Add another day to your rotation!</Button>
        </Link>
        <h2 className="indexTitle">Meal Rotation</h2>
        <p className="weekNumber">8 Weeks</p>
        <div className="rotationFlex">
          {weeks?.map((day) => (
            <DayCard key={day.firebaseKey} dayObj={day} onUpdate={getAllTheDays} />
          ))}
        </div>
      </div>
    </>
  );
}
