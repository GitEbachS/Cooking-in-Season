// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import NoteCard from '../../components/NoteCard';
// import { getSingleNote } from '../../api/noteData';

// export default function ViewNote() {
//   const [noteDetails, setNoteDetails] = useState({});
//   const router = useRouter();

//   const { firebaseKey } = router.query;

//   const getNDetails = () => {
//     getSingleNote(firebaseKey).then(setNoteDetails);
//   };

//   useEffect(() => {
//     getNDetails();
//   }, [firebaseKey]);

//   return (
//     <div>{noteDetails.map((note) => (
//       <NoteCard key={note.firebaseKey} noteObj={note} onUpdate={getNDetails} />
//     ))}
//     </div>
//   );
// }
