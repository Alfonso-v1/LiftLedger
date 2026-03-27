import {MdEdit, MdDelete} from 'react-icons/md'

function ExerciseRow({ exercise, onDelete, onEdit }) {
    

    return (
        <>
            <tr>
                <td>{exercise.name}</td>
                <td>{exercise.weight}</td>
                <td>{exercise.unit}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.date}</td>
                <td className='action-buttons'>
                    <span className='tooltip'>
                        <MdEdit onClick={() => onEdit(exercise)} />
                        <span className='tooltip-text'>Edit Exercise</span>
                    </span>
                    <span className='tooltip'>
                        <MdDelete onClick={() => onDelete(exercise._id)} />
                        <span className='tooltip-text'>Delete Exercise</span>
                    </span>
                </td>
            </tr>
        </>
    )
}

export default ExerciseRow;