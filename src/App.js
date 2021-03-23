import React, { useState } from 'react';
import FlashcardList from './FlashcardList';
import QA from './QA';
import './App.css';

function App() {
    const [flashcards] = useState(QA);
    
  return (
    <>
        <div className='header'>
            Interview Prep Flashcards
        </div>
        <div className="container">
            <FlashcardList flashcards={flashcards} />
        </div>
    </>
  );
}

export default App;