import React, { useState, useEffect, useRef } from 'react';
import randomColor from 'randomcolor';

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')
  const [hex, setHex] = useState('ffffff');

  const frontEl = useRef()
  const backEl = useRef()

  const handleColorChange = () => {
      setHex(randomColor());
  }

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 200))
}

useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
useEffect(() => {
      handleColorChange();
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, []);

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height, border: `5px solid ${hex}`}}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}
        {flashcard.options ? 
        <div className='flashcard-options'>
            {flashcard.options.map(option => {
                return <div className='flashcard-option' key={option}>{option}</div>
            })}
        </div>
        : ''}
      </div>
      <div className="back" ref={backEl} style={{ backgroundColor: `${hex}50` }}>
          {flashcard.answer}
      </div>
    </div>
  )
}