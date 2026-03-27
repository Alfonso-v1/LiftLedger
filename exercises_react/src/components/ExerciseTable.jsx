import ExerciseRow from './ExerciseRow';
import '../App.css'

function ExerciseTable({ exercises, onDelete, onEdit }) {
    return (
        <table className='exercise-table'>
            <thead>
                <tr>
                    <th>Exercise Name</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Reps</th>
                    <th>Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <ExerciseRow exercise={exercise} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    )
}

export default ExerciseTable;