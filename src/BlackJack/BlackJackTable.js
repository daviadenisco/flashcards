import React, { useState, useEffect } from 'react';
import BlackJackCard from './BlackJackCard';
import { determineHandTotal, dealCard, message } from '../helpers';
import cardBack from '../images/card-back.png';

// fix key prop issue
// fix styling
// finish tutorial

// {destructuring props} <= so we don't need to access flashcards from props.flashcards
export default function BlackJackTable({ deck }) {
    let gameDeck = deck;
    let chipStart = 500;
    chipStart = chipStart.toFixed(2);


    const [totalChips, setTotalChips] = useState(chipStart);
    const [bet, setBet] = useState(0);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playerTotal, setPlayerTotal] = useState(0);
    const [dealerTotal, setDealerTotal] = useState(0);
    const [playerBlackJack, setPlayerBlackJack] = useState(false);
    const [dealerBlackJack, setDealerBlackJack] = useState(false);
    const [playerStand, setPlayerStand] = useState(false);
    const [dealerStand, setDealerStand] = useState(false);
    const [playerBust, setPlayerBust] = useState(false);
    const [dealerBust, setDealerBust] = useState(false);
    const [revealDealerCard, setRevealDealerCard] = useState(false);
    const [winner, setWinner] = useState();

    const handleNewDeal = () => {
        setBet(bet * 0);
        setPlayerHand([]);
        setDealerHand([]);
        setPlayerTotal(0);
        setDealerTotal(0);
        setPlayerBlackJack(false);
        setDealerBlackJack(false);
        setPlayerStand(false);
        setDealerStand(false);
        setPlayerBust(false);
        setDealerBust(false);
        setRevealDealerCard(false);
        setWinner();
    };

    useEffect(() => {
        // use parsefloat or whayever makes drcimals
        let theBet = parseInt(bet, 10);
        let chips = parseInt(totalChips, 10);
        let chipsTotal = chips - theBet;
        chipsTotal = chipsTotal.toFixed(2);
        if (bet > 0) {
            getInitialDeal(gameDeck);
            setTotalChips(chipsTotal);
        };
    }, [bet]);

    useEffect(() => {
        setPlayerTotal(handleDetermineHandTotal(playerHand));
        setDealerTotal(handleDetermineHandTotal(dealerHand));
    }, [playerHand, dealerHand, playerTotal, dealerTotal]);

    useEffect(() => {
        if (playerStand === true && dealerTotal <= 16) {
            handleDealerHit(gameDeck);
        };
    }, [playerStand, dealerTotal]);

    useEffect(() => {

        if (dealerTotal >= 17) {
            setDealerStand(true);
        };
    }, [dealerTotal, dealerStand]);
    
    useEffect(() => {
        if (playerStand === true && dealerStand === true) {
            handleUpdateWinner();
        };
    }, [playerStand, dealerStand]);

    useEffect(() => {
 
        if (playerTotal > 21) {
            setPlayerBust(true);
            setPlayerStand(true);
            handleUpdateWinner();
            setRevealDealerCard(true);
        };
    }, [playerTotal]);

    useEffect(() => {
        if (dealerTotal > 21) {
            setDealerBust(true);
        };
    });

    useEffect(() => {
        if (dealerHand.length === 2) {

            if (dealerHand[0].value === 'A' || dealerHand[1].value === 'A') {
                if (dealerHand[0].value === 5 || dealerHand[1].value === 5 || dealerTotal === 16) {
                    handleDealerHit(gameDeck);
                };
            };
        };
    });

    const handleDetermineHandTotal = (hand) => {
        let newTotal = determineHandTotal(hand);
        return newTotal;
    };

    // add a card to the dealer's hand
    const handleDealerHit = (gameDeck) => {
        let card = dealCard(gameDeck);
        setDealerHand(dealerHand.concat(card));
    };
    // Ace count must be part of the state, otherwise 10 will be subtracted on every hit.
    const handlePlayerHit = (gameDeck) => {
        let card = dealCard(gameDeck);

        if (playerTotal < 21) {
            setPlayerHand(playerHand.concat(card));
        };     
    };

    const getInitialDeal = (gameDeck) => {
        getInitialPlayerDeal(gameDeck);
        getInitialDealerDeal(gameDeck);
    };

    const getInitialDealerDeal = (gameDeck) => {
        let firstCard = dealCard(gameDeck);
        let secondCard = dealCard(gameDeck);
        setDealerHand([firstCard, secondCard]);
        let dealerDealSum = determineHandTotal([firstCard, secondCard]);
        setDealerTotal(dealerDealSum);

        if (dealerDealSum === 21 && playerTotal !== 21) {
            setRevealDealerCard(true);
            setDealerBlackJack(true);
            setPlayerStand(true);
            setDealerStand(true);
        };
    };

    const getInitialPlayerDeal = (gameDeck) => {
        let firstCard = dealCard(gameDeck);
        let secondCard = dealCard(gameDeck);
        setPlayerHand([firstCard, secondCard]);
        let playerDealSum = determineHandTotal([firstCard, secondCard]);
        setPlayerTotal(playerDealSum);
    
        if (playerDealSum === 21  && dealerTotal !== 21) {
            setRevealDealerCard(true);
            setPlayerBlackJack(true);
            setDealerHand(dealerHand.slice(0, 2));
            setDealerStand(true);
            setPlayerStand(true);
        };
    };

    const handleUpdateWinner = () => {
        let theBet = parseInt(bet, 10);
        let chips = parseInt(totalChips, 10);
        let pushEven = chips + theBet;
        pushEven = pushEven.toFixed(2);
        let blackjackWin = chips + (theBet * 2) + (theBet / 2);
        blackjackWin = blackjackWin.toFixed(2);
        let win = chips + (theBet * 2);
        win = win.toFixed(2);

        if (playerTotal === dealerTotal) {
            setWinner(message.push);
            setTotalChips(pushEven);
            setRevealDealerCard(true);
        } else if ((playerTotal <= 21 && playerBlackJack === false && dealerTotal < playerTotal) || (dealerBust === true && playerBust === false)) {
            setWinner(message.player);
            setTotalChips(win);
            setRevealDealerCard(true);
        } else if (playerBlackJack === true) {
            setWinner(message.player);
            setTotalChips(blackjackWin);
            setRevealDealerCard(true);
        } else if (playerBust === true) {
            setWinner(message.playerLosesBet);
            setRevealDealerCard(true);
        } else {
            setWinner(message.dealer);
            setRevealDealerCard(true);
        };
    };

    return (
        <div className="container">
            <div className='player-controls'>
                {/* <div className='banner'>{winner ? winner : message.placeBet}</div> */}
                <div className='banner'>{bet < 1 ? message.placeBet : winner}</div>
                {winner || (totalChips === 0 && bet === 0) ? 
                    <div className='btn-controls'>
                        <div className='btn-align'>
                            <button className='btn' onClick={() => handleNewDeal()}>{message.keepPlaying}</button>
                        </div>
                    </div> : ''}
                {totalChips === 0 && bet === 0 ? <div>You lost all your money gambling. How are you going to pay your bills?!</div> : ''}
                <div>
                    {(!winner) ? <div className='btn-controls'>
                        <div className='btn-align'>
                            <button className={`btn m-r-20 ${bet === message.one ? 'selected blue' : ''}`} disabled={totalChips >= message.one || bet === message.one ? false : true} onClick={() => setBet(message.one)}>$1</button>
                            <button className={`btn m-r-20 ${bet === message.five ? 'selected red' : ''}`} disabled={totalChips >= message.five || bet === message.five ? false : true} onClick={() => setBet(message.five)}>$5</button>
                            <button className={`btn m-r-20 ${bet === message.ten ? 'selected yellow' : ''}`} disabled={totalChips >= message.ten || bet === message.ten ? false : true} onClick={() => setBet(message.ten)}>$10</button>
                            <button 
                                className={`btn m-r-20 ${bet === message.twenty ? 'selected brown' : ''}`} 
                                disabled={totalChips >= message.twenty ? false : true} 
                                onClick={() => setBet(message.twenty)}>$20
                            </button>
                            <button 
                                className={`btn m-r-20 ${bet === message.twentyFive ? 'selected black' : ''}`} 
                                disabled={totalChips >= message.twentyFive || bet === message.twentyFive ? false : true} 
                                onClick={() => setBet(message.twentyFive)}>$25</button>
                            <button className={`btn m-r-20 ${bet === message.fifty ? 'selected purple' : ''}`} disabled={totalChips >= message.fifty || bet === message.fifty ? false : true} onClick={() => setBet(message.fifty)}>$50</button>
                            <button className={`btn m-r-20 ${bet === message.oneHundred ? 'selected white' : ''}`} disabled={totalChips >= message.oneHundred || bet === message.oneHundred ? false : true} onClick={() => setBet(message.oneHundred)}>$100</button>
                            <button className={`btn ${bet === message.fiveHundred ? 'selected grey' : ''}`} disabled={totalChips >= message.fiveHundred || bet === message.fiveHundred ? false : true} onClick={() => setBet(message.fiveHundred)}>$500</button>
                        </div>
                    </div> : ''}
                    {/* <div className='btn-controls'>
                        <div className='f-s-30 btn-align'>{message.totalChips} {`$ ${totalChips}`}</div>
                    </div> */}
                    <div className='btn-controls'>
                        <div className='btn-align'>
                            <span className='f-s-30 m-r-20'>{message.totalChips} {`$ ${totalChips}`}</span>
                            <button className='btn m-r-20' disabled={playerStand === true || !playerHand.length ? true : false} onClick={() => handlePlayerHit(gameDeck)}>{message.hit}</button>
                            <button className='btn' disabled={bet > 0 && playerStand === false ? false : true} onClick={() => setPlayerStand(true)}>{message.stand}</button>
                        </div>
                    </div>
                </div>
            </div>
            <span className='left-align m-t-20'>
                {message.dealerHand} 
                {playerStand === true ? <> {message.total} {dealerTotal}</> : ''}
                {dealerBust === true ? <> {message.bust}</> : ''}
                {dealerBlackJack ? <> {message.blackjack}</> : ''}
            </span>
            <div className='cards-grid'>
                {/* THIS CODE CAUSES KEY PROP ISSUE */}
                {(dealerHand.length) ? 
                    <>
                        {revealDealerCard === true ? 
                            dealerHand.map(card => {
                                return <><BlackJackCard card={card} key={`${card.value}${card.suit}`} /></>
                            })
                            : 
                            <>
                                <BlackJackCard card={dealerHand[0]} key={`${dealerHand[0].value}${dealerHand[0].suit}`} />
                                <img className='card-back' src={cardBack} alt='card-back' />
                            </>}
                    </> 
                    : ''}  
            </div>
            <span className='left-align m-t-20'>
                {message.playerHand} 
                {playerHand.length ?<> {message.total} {playerTotal}</>: ''}
                {playerBust === true ? <> {message.bust}</> : ''}
                {playerBlackJack === true ? <> {message.blackjack}</> : ''}
            </span>
            <div className='cards-grid'>
                {playerHand ? playerHand.map(card => {
                    return <BlackJackCard card={card} key={`${card.value}${card.suit}`} />
                }) : ''}
            </div>
        </div>
    )
}
