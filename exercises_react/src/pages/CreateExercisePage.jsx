import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateExersisePage = () => {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [reps, setReps] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = { name, weight, unit, reps, date }
        const response = await fetch(
            '/exercises', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newExercise)
        }
        );
        if (response.status === 201) {
            alert(`Successfully added the ${newExercise.name}!`);
        } else {
            alert('Failed to add exercise, status code = ' + response.status)
        }
        navigate('/')
    }

    return (
        <div className='form-container'>
            <h2>Add Exercise</h2>

            <p>
                <label htmlFor='name'>Exercise Name</label>
                <input
                    type='text'
                    id='name'
                    value={name}
                    placeholder='Enter Exercise Name'
                    onChange={e => setName(e.target.value)}
                /> 
            </p>

            <p>
                <label htmlFor='weight'>Weight</label>
                <input
                    type='number'
                    id='weight'
                    value={weight}
                    placeholder='Enter Weight'
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
                    placeholder='Enter # of Reps'
                    onChange={e => setReps(e.target.valueAsNumber)}
                /> 
            </p>

            <p>
                <label htmlFor='date'>Date</label>
                <input
                    type='text'
                    id='date'
                    value={date}
                    placeholder='MM-DD-YY'
                    onChange={e => setDate(e.target.value)}
                /> 
            </p>

            <button
                onClick={addExercise}
            >Add</button>

        </div>
    )
}

export default CreateExersisePage;