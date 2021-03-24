import React, { useState } from 'react';
import FlashcardList from './Flashcards/FlashcardList';
import BlackJackTable from './BlackJack/BlackJackTable';
import { createDeck } from './helpers';
import QA from './QA';
import './App.css';

function App() {
    const [flashcards] = useState(QA);
    const [deck] = useState(createDeck);
    const [takingABreak, setTakingABreak] = useState(true);
    
  return (
    <>
        <div className='header'>
            {takingABreak ? 'Play BlackJack!' : 'Interview Prep Flashcards'}
            <div className='btn-container'>
                <button className='btn' onClick={() => setTakingABreak(!takingABreak)}>
                    {takingABreak ? 'Study' : 'Take a break!'}
                </button>
            </div>
        </div>
        <div className="container">
            {takingABreak ? <BlackJackTable deck={deck} /> : <FlashcardList flashcards={flashcards} />}
        </div>
    </>
  );
}

export default App;