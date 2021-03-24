import React, { useState } from 'react';
import BlackJackCard from './BlackJackCard';
import { initialDealerDeal, initialPlayerDeal, determineHandTotal } from '../helpers';

// {destructuring props} <= so we don't need to access flashcards from props.flashcards
export default function BlackJackTable({ deck }) {
    const [totalChips, setTotalChips] = useState(100);
    const [checkWager, setCheckWager] = useState(0);
    const [wager, setWager] = useState(0);
    const [initialDealerDealArr, setInitialDealerDealArr] = useState();
    const [initialPlayerDealArr, setInitialPlayerDealArr] = useState();
    const [dealerDealTotal, setDealerDealTotal] = useState(0);
    const [playerDealTotal, setPlayerDealTotal] = useState(0);

    const handleWager = () => {
        if (checkWager < totalChips && checkWager.toString().split('').includes('.')) {
            setWager(checkWager);
        };
    };

    const getInitialDeal = (deck) => {
        getInitialDealerDeal(deck);
        getInitialPlayerDeal(deck);
    };

    const getInitialDealerDeal = (deck) => {
        let dealCards = initialDealerDeal(deck);
        setInitialDealerDealArr(dealCards);
        console.log('DEALERDEAL: ', initialDealerDealArr);
        let dealerDealTotalSet = determineHandTotal(dealCards);
        setDealerDealTotal(dealerDealTotalSet);
    };

    const getInitialPlayerDeal = (deck) => {
        let dealCards = initialPlayerDeal(deck);
        console.log('dealCards: ', dealCards);
        setInitialPlayerDealArr(dealCards);
        console.log('PLAYERDEAL: ', initialPlayerDealArr);
        let playerDealTotalSet = determineHandTotal(dealCards);
        setPlayerDealTotal(playerDealTotalSet);
    };

    return (
        <div>
            <div>
                <div>Total Chips: {`$${totalChips}.00`}</div>
                <span>
                    <button>Hit</button>
                    <button>Stand</button>
                    <input onChange={(e) => setCheckWager(e.target.value)} placeholder='Enter wager'></input>
                    {checkWager > totalChips ? <div className='warning'>You don't have enough chips! Please enter a smaller wager.</div> : ''}
                    {checkWager.toString().split('').includes('.') ? <div className='warning'>Please enter a whole number. You cannot bet less than a whole dollar.</div> : ''}
                    <button onClick={() => handleWager}>Set Wager</button>
                    <button onClick={() => getInitialDeal(deck)}>Deal</button>
                    {/* <button>New Game</button> */}
                </span>
            </div>
            <div className='cards-grid container'>
                    {/* <span>Player Hand</span>
                    {initialPlayerDealArr ? initialPlayerDealArr.map(card => {
                        return <BlackJackCard card={card} key={`${card.value}${card.suit}`} />
                    }) : ''} */}
                    <span>Dealer Hand</span>
                    {initialDealerDealArr ? initialDealerDealArr.map(card => {
                        return <BlackJackCard card={card} key={`${card.value}${card.suit}`} />
                    }) : ''}
                    {dealerDealTotal}
            </div>
            <div className='cards-grid container'>
                    <span>Player Hand</span>
                    {initialPlayerDealArr ? initialPlayerDealArr.map(card => {
                        return <BlackJackCard card={card} key={`${card.value}${card.suit}`} />
                    }) : ''}
                    {/* <span>Dealer Hand</span>
                    {initialDealerDealArr ? initialDealerDealArr.map(card => {
                        return <BlackJackCard card={card} key={`${card.value}${card.suit}`} />
                    }) : ''} */}
                    {playerDealTotal}
            </div>
            {/* render all cards at first just to see them working */}
            {/* <div className='cards-grid container'>
                    {deck.map(card => {
                        return <BlackJackCard card={card} key={`${card.value}${card.suit}`} />
                    })}
            </div> */}
        </div>
    )
}
