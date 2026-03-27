import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = { name, weight, unit, reps, date }
        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(editedExercise)
        }
        );
        if (response.status === 200) {
            alert('Successfully edited the exercise!');
        } else {
            alert('Failed to edit the exercise, please try again.')
        }
        navigate('/')
    }

    return (
        <div className='form-container'>
            <h2>Edit Exercise</h2>
            <p>
                <label htmlFor='name'>Exercise Name</label>
                <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                /> 
            </p>

            <p>
                <label htmlFor='weight'>Weight</label>
                <input
                    type='number'
                    id='weight'
                    value={weight}
                    onChange={e => setWeight(e.target.valueAsNumber)}
                /> 
            </p>

            <p>
                <label htmlFor='Unit'>Unit</label>
                <select
                    value={unit}
                    id='unit'
                    onChange={e => setUnit(e.target.value)}
                >
                    <option value=''>Select Unit</option>
                    <option value='lbs'>lbs</option>
                    <option value='kgs'>kgs</option>
                </select>
            </p>

            <p>
                <label htmlFor='reps'>Reps</label>
                <input
                    type='number'
                    id='reps'
                    value={reps}
                    onChange={e => setReps(e.target.valueAsNumber)}
                /> 
            </p>

            <p>
                <label htmlFor='date'>Date</label>
                <input
                    type='text'
                    id='date'
                    value={date}
                    onChange={e => setDate(e.target.value)}
                /> 
            </p>

            <p>
                <button
                    onClick={editExercise}
                >Update</button>
            </p>
        </div>
    )
}

export default EditExercisePage;