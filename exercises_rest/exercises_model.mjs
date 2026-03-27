/**
Name: Alfonso Vilchez
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';
const EXERCISE_CLASS = 'Exercise';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true },
})

const Exercise = mongoose.model(EXERCISE_CLASS, exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

const getExercises = async () => {
    return Exercise.find({});
}

const getExercisesById = async (_id) => {
    return Exercise.findById(_id);
}

const updateExercise = async (_id, updates) => {
    const updatedExercise = await Exercise.findOneAndUpdate({ _id: _id }, updates, { new: true })
    return updatedExercise;
}

const deleteExercise = async (_id) => {
    const deletedExercise = await Exercise.deleteOne({_id: _id});
    const {deletedCount} = deletedExercise;
    return {deletedCount};
}

export { connect, createExercise, getExercises, getExercisesById, updateExercise, deleteExercise };