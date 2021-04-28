import React, { useState } from 'react';
import FlashcardList from './Flashcards/FlashcardList';
import BlackJackTable from './BlackJack/BlackJackTable';
import { createDeck } from './helpers';
import QA from './QA';
import './App.css';

function App() {
    const [flashcards] = useState(QA);
    const [deck] = useState(createDeck);
    const [takingABreak, setTakingABreak] = useState(false);
    
  return (
    <div>
        <div className='header'>
            {takingABreak ? <span>Play blackjack!</span> : <span>Interview Prep Flashcards</span>}
            <div className='btn-container'>
                <button className='nav-btn' onClick={() => setTakingABreak(!takingABreak)}>
                    {takingABreak ? 'Study' : 'Take a break!'}
                </button>
            </div>
        </div>
        <div>
            {takingABreak ? <BlackJackTable deck={deck} setTakingABreak={setTakingABreak} /> : <FlashcardList flashcards={flashcards} />}
        </div>
    </div>
  );
}

export default App;