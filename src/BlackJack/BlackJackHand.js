import React from 'react';
import BlackJackCard from './BlackJackCard';
import cardBack from '../images/card-back.png';

export default function BlackJackHand({ hand, revealDealerCard, owner }) {    

  return (
    <>
      {owner === 'player' ? hand.map(card => {
              return <><BlackJackCard card={card} key={`${card.value}${card.suit}`} /></>
          })
        :
        <>
          {revealDealerCard === true ? 
              hand.map(card => {
                  return <><BlackJackCard card={card} key={`${card.value}${card.suit}`} /></>
              })
              : 
              <>
                  <BlackJackCard card={hand[0]} key={`${hand[0].value}${hand[0].suit}`} />
                  <img className='card-back' src={cardBack} alt='card-back' />
              </>
          }
        </>
      }
    </>
  )
}