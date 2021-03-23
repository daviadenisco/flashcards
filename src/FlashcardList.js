import React from 'react';
import Flashcard from './Flashcard';

// {destructuring props} <= so we don't need to access flashcards from props.flashcards
export default function FlashcardList({ flashcards }) {
    return (
        <div className='card-grid'>
            {flashcards.map(flashcard => {
                return <Flashcard flashcard={flashcard} key={flashcard.id} />
            })}
        </div>
    )
}
