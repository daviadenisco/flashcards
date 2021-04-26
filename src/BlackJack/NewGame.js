import React from 'react';

export default function NewGame({ setTotalChips, handleNewDeal, setTakingABreak }) {

    const goToATM = () => {
        setTotalChips(500);
        handleNewDeal();
    }
    
  return (
    <div className='btn-controls'>
        <div className='btn-align'>
            <button 
                className='btn m-r-20' 
                onClick={() => goToATM()}
            >
                Go to the ATM
            </button>
            <button className='btn' onClick={() => setTakingABreak(false)}>
                Study
            </button>
        </div>
    </div> 
)}