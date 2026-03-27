import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import CreateExersisePage from './pages/CreateExercisePage';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <>
      <Router>
        <div className='site-banner'>
          <header>
              <h1>Lift Ledger</h1>
              <p>Your strength journey, organized. <br/> Simple logging for serious lifters.</p>
          </header>
            <Navigation />
        </div>
        <main>
          <Routes>
            <Route path='/' element={<HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
            <Route path='/edit-exercise' element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
            <Route path='/create-exercise' element={<CreateExersisePage />}></Route>
          </Routes>
        </main>
        <footer>
          <p>&copy; 2026 Alfonso Vilchez</p>
        </footer>
      </Router>
    </>
  )

}

export default App
