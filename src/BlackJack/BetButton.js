import React from 'react';
import { amt } from '../helpers';

export default function BetButton({ bet, totalChips, setBet }) {
    
  return (
      <>
         {amt.map(betAmt => {
            return <button 
                        className={`btn m-r-20 ${bet === betAmt.value ? `selected ${betAmt.color}` : ''}`} 
                        disabled={totalChips >= betAmt.value || bet === betAmt.value ? false : true} 
                        onClick={() => setBet(betAmt.value)}
                    >
                        ${betAmt.value}
                    </button>
         })}
      </>
)}