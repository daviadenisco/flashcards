import React, { useState, useEffect } from 'react';
import BlackJackHand from './BlackJackHand';
import BetButton from './BetButton';
import { determineHandTotal, dealCard, message, amt } from '../helpers';

// fix key prop issue
// fix styling
// finish tutorial
// displaying number on-screen? use toFixed(2)
// adding and subtracting numbers? use parseFloat(bet)
// create GameOver.js and a Go to the ATM button to restart the game

// {destructuring props} <= so we don't need to access flashcards from props.flashcards
export default function BlackJackTable({ deck }) {
    let gameDeck = deck;
    let chipStart = 500;
    chipStart = parseFloat(chipStart);

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
        let theBet = parseFloat(bet);
        let chips = parseFloat(totalChips);
        let chipsTotal = parseFloat(chips - theBet);

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
        let theBet = parseFloat(bet);
        let chips = parseFloat(totalChips);
        let pushEven = chips + theBet;
        let blackjackWin = chips + (theBet * 2) + (theBet / 2);
        let win = chips + (theBet * 2);

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
                <div className='banner'>
                    <div className='shimmer'>{bet < 1 ? message.placeBet : winner}</div>
                </div>
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
                            <BetButton winner={winner} bet={bet} totalChips={totalChips} setBet={setBet} />
                            {/* <button className={`btn m-r-20 ${bet === amt.one.value ? 'selected white' : ''}`} disabled={totalChips >= amt.one.value || bet === amt.one.value ? false : true} onClick={() => setBet(amt.one.value)}>${amt.one.value}</button>

                            <button className={`btn m-r-20 ${bet === amt.two.value ? 'selected yellow' : ''}`} disabled={totalChips >= amt.two.value || bet === amt.two.value ? false : true} onClick={() => setBet(amt.two.value)}>${amt.two.value}</button>

                            <button className={`btn m-r-20 ${bet === amt.five.value ? 'selected red' : ''}`} disabled={totalChips >= amt.five.value || bet === amt.five.value ? false : true} onClick={() => setBet(amt.five.value)}>${amt.five.value}</button>

                            <button className={`btn m-r-20 ${bet === amt.ten.value ? 'selected blue' : ''}`} disabled={totalChips >= amt.ten.value || bet === amt.ten.value ? false : true} onClick={() => setBet(amt.ten.value)}>${amt.ten.value}</button>

                            <button className={`btn m-r-20 ${bet === amt.twenty.value ? 'selected grey' : ''}`} disabled={totalChips >= amt.twenty.value ? false : true} onClick={() => setBet(amt.twenty.value)}>${amt.twenty.value}</button>

                            <button className={`btn m-r-20 ${bet === amt.twentyFive.value ? 'selected green' : ''}`} disabled={totalChips >= amt.twentyFive.value ? false : true} onClick={() => setBet(amt.twentyFive.value)}>${amt.twentyFive.value}</button>

                            <button className={`btn m-r-20 ${bet === amt.fifty.value ? 'selected orange' : ''}`} disabled={totalChips >= amt.fifty.value || bet === amt.fifty.value ? false : true} onClick={() => setBet(amt.fifty.value)}>${amt.fifty.value}</button>

                            <button className={`btn m-r-20 ${bet === amt.oneHundred.value ? 'selected black' : ''}`} disabled={totalChips >= amt.oneHundred.value || bet === amt.oneHundred.value ? false : true} onClick={() => setBet(amt.oneHundred.value)}>${amt.oneHundred.value}</button>

                            <button className={`btn m-r-20 ${bet === amt.twoHundredFifty.value ? 'selected pink' : ''}`} disabled={totalChips >= amt.twoHundredFifty.value || bet === amt.twoHundredFifty.value ? false : true} onClick={() => setBet(amt.twoHundredFifty.value)}>${amt.twoHundredFifty.value}</button>

                            <button className={`btn ${bet === amt.fiveHundred.value ? 'selected purple' : ''}`} disabled={totalChips >= amt.fiveHundred.value || bet === amt.fiveHundred.value ? false : true} onClick={() => setBet(amt.fiveHundred.value)}>${amt.fiveHundred.value}</button> */}
                        </div>
                    </div> : ''}
                    <div className='btn-controls'>
                        <div className='btn-align'>
                            <span className='f-s-30 m-r-20'>{message.totalChips} {`$ ${totalChips.toFixed(2)}`}</span>
                            <button className='btn m-r-20' disabled={playerStand === true || !playerHand.length ? true : false} onClick={() => handlePlayerHit(gameDeck)}>{message.hit}</button>
                            <button className='btn' disabled={bet > 0 && playerStand === false ? false : true} onClick={() => setPlayerStand(true)}>{message.stand}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='left-align m-l-20 m-t-20 hand-labels'>
                {message.dealerHand} 
                {playerStand === true ? <>{message.total} {dealerTotal}</> : ''}
                {dealerBust === true ? <>{message.bust}</> : ''}
                {dealerBlackJack ? <>{message.blackjack}</> : ''}
            </div>
            <div className='cards-grid'>
                {/* THIS CODE CAUSES KEY PROP ISSUE */}
                {dealerHand.length ? 
                    <BlackJackHand 
                        hand={dealerHand} 
                        key={`${dealerHand[0].value}${dealerHand[0].suit}`} 
                        revealDealerCard={revealDealerCard} 
                        owner='dealer' 
                    />
                : ''}  
            </div>
            <div className='left-align m-l-20 m-t-20 hand-labels'>
                {message.playerHand} 
                {playerHand.length ? <>{message.total} {playerTotal}</> : ''}
                {playerBust === true ? <>{message.bust}</> : ''}
                {playerBlackJack === true ? <>{message.blackjack}</> : ''}
            </div>
            <div className='cards-grid'>
                {playerHand.length ? 
                    <BlackJackHand 
                        hand={playerHand} 
                        key={`${playerHand[0].value}${playerHand[0].suit}`} 
                        owner='player'
                    />
                : ''}
            </div>
        </div>
    )
}
