import React, { useState, useEffect } from 'react';
import BlackJackHand from './BlackJackHand';
import BetButton from './BetButton';
import NewGame from './NewGame';
import { determineHandTotal, dealCard, message } from '../helpers';

// finish tutorial
// displaying number on-screen? use toFixed(2)
// adding and subtracting numbers? use parseFloat(bet)

// {destructuring props} <= so we don't need to access flashcards from props.flashcards
export default function BlackJackTable({ deck, setTakingABreak }) {
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
    const [lostHat, setLostHat] = useState(false);
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
        setLostHat(false);
        setWinner();
    };

    useEffect(() => {
        if (totalChips === 0 && bet === 0) {
            setLostHat(true);
        }
    }, [bet, totalChips, lostHat])

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

    const handleDealerHit = (gameDeck) => {
        let card = dealCard(gameDeck);
        setDealerHand(dealerHand.concat(card));
    };

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
                <div>
                    {(!winner) ? 
                    <div className='btn-controls'>
                        <div className='btn-align'>
                            <BetButton winner={winner} bet={bet} totalChips={totalChips} setBet={setBet} />
                        </div>
                    </div> : ''}
                    {winner && totalChips > 0.5 ? 
                    <div className='btn-controls'>
                        <div className='btn-align'>
                            <button className='btn' onClick={() => handleNewDeal()}>{message.keepPlaying}</button>
                        </div>
                    </div> 
                    : ''}
                    {winner && totalChips < 1 ? 
                        <NewGame setTotalChips={setTotalChips} handleNewDeal={handleNewDeal} setTakingABreak={setTakingABreak} />
                        : ''}
                    <div className='btn-controls'>
                        <div className='btn-align'>
                            <span className='f-s-30 m-r-20'>{message.totalChips} {`$ ${totalChips.toFixed(2)}`}</span>
                            <button className='btn m-r-20' disabled={playerStand === true || !playerHand.length ? true : false} onClick={() => handlePlayerHit(gameDeck)}>{message.hit}</button>
                            <button className='btn' disabled={bet > 0 && playerStand === false ? false : true} onClick={() => setPlayerStand(true)}>{message.stand}</button>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <div className='left-align m-l-20 m-t-20 hand-labels'>
                    {message.dealerHand } 
                    {/* space before message.whatever is necessary to keep a space between each word */}
                    {playerStand === true ? <> {message.total} {dealerTotal} </> : ''}
                    {dealerBust === true ? <> {message.bust} </> : ''}
                    {dealerBlackJack ? <> {message.blackjack} </> : ''}
                </div>
                <div className='cards-grid'>
                    {/* THIS CODE CAUSES KEY PROP ISSUE */}
                    {dealerHand.length ? 
                        <BlackJackHand 
                            hand={dealerHand} 
                            key={`${dealerHand[0].value}${dealerHand[0].suit}d`} 
                            revealDealerCard={revealDealerCard} 
                            owner='dealer' 
                        />
                    : ''}  
                </div>
            </>
            <>
                <div className='left-align m-l-20 m-t-20 hand-labels'>
                    {message.playerHand } 
                    {playerHand.length ? <> {message.total} {playerTotal} </> : ''}
                    {playerBust === true ? <> {message.bust} </> : ''}
                    {playerBlackJack === true ? <> {message.blackjack} </> : ''}
                </div>
                <div className='cards-grid'>
                    {playerHand.length ? 
                        <BlackJackHand 
                            hand={playerHand} 
                            key={`${playerHand[0].value}${playerHand[0].suit}p`} 
                            owner='player'
                        />
                    : ''}
                </div>
            </>
        </div>
    )
}
