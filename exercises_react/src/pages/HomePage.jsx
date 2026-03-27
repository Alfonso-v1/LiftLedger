import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ExerciseTable from '../components/ExerciseTable';

function HomePage({setExerciseToEdit}) {

    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    const onDelete = async (_id) => {
        const response = await fetch(
            `/exercises/${_id}`,
            { method: 'DELETE' }
        );
        if (response.status === 204) {
            setExercises(exercises.filter(m => m._id !== _id));
        } else {
            alert(`Failed to delete movie with ID = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = (exercise) => {
        setExerciseToEdit(exercise);
        navigate('/edit-exercise');
    }
    

    return (
        <>
            <h2>Your Lift Ledger</h2>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit} />
        </>
    )
}

export default HomePage;