import React from 'react';

export default function BlackJackCard({ card }) {
    let heartImg = 'https://i.imgur.com/4iNOnmA.png';
    let spadeImg = 'https://i.imgur.com/iS4hfnn.png';
    let diamondImg = 'https://i.imgur.com/dMxnyb0.png';
    let clubImg = 'https://i.imgur.com/TxGu6WG.png';
    
    const handleImgSelection = (suit) => {
      if (suit === 'hearts') {
        return heartImg;
      } else if (suit === 'spades') {
        return spadeImg;
      } else if (suit === 'diamonds') {
        return diamondImg;
      } else if (suit === 'clubs') {
        return clubImg;
      }
    }

  return (
      <div className='cards'>
        {card.value}
        <img 
          className='card-img' 
          src={handleImgSelection(card.suit)} 
          alt={`${card.suit}`}
          ></img>
      </div>
  )
}