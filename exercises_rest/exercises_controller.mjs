/**
Name: Alfonso Vilchez
 */
import "dotenv/config";
import express from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import * as exercises from "./exercises_model.mjs";

const PORT = process.env.PORT;
const ERROR_NOT_FOUND = { Error: "Not found" };
const ERROR_INVALID_REQUEST = { Error: "Invalid request" };
const app = express();

const validationSchema = [
  body("name").notEmpty(),
  body("reps").isInt({ min:  1}),
  body("weight").isInt({ min: 0.1 }),
  body("unit").isIn(["kgs", "lbs"]),
  body("date").matches(/^\d{2}-\d{2}-\d{2}$/).custom((value) => {
    const [month, day, year] = value.split('-').map(Number);
    const date = new Date(2000 + year, month - 1, day);

    return (
      date.getFullYear() === 2000 + year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }),
]

app.use(express.json());

app.listen(PORT, async () => {
  await exercises.connect();
  console.log(`Server listening on port ${PORT}...`);
});

app.post(
  "/exercises",
  validationSchema,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(ERROR_INVALID_REQUEST);
    }

    const exercise = await exercises.createExercise(
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date,
    );

    res.status(201).json(exercise);
  }));

app.get(
  "/exercises",
  asyncHandler(async (req, res) => {
    const foundExercises = await exercises.getExercises();
    res.status(200).json(foundExercises);
  }),
);

app.get(
  "/exercises/:_id",
  asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const foundExercise = await exercises.getExercisesById(_id);

    if (!foundExercise) {
      res.status(404).json(ERROR_NOT_FOUND);
    } else {
      res.status(200).json(foundExercise);
    }
  }),
);

app.put(
  "/exercises/:_id",
  validationSchema,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(ERROR_INVALID_REQUEST);
    }
    
    const { _id } = req.params;
    const foundExercise = await exercises.getExercisesById(_id);
    const updates = req.body;

    if (!foundExercise) {
      res.status(404).json(ERROR_NOT_FOUND);
    } else {
      const updatedExercise = await exercises.updateExercise(
        _id, updates
      );
      res.status(200).json(updatedExercise);
    }
    ;
  }),
);

app.delete(
  "/exercises/:_id",
  asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const foundExercise = await exercises.getExercisesById(_id);

    if (!foundExercise) {
      res.status(404).json(ERROR_NOT_FOUND)
    } else {
      const deletedExercise = await exercises.deleteExercise(_id);
      res.status(204).send();
    }
  }),
);


