import React, { useState } from 'react';
import GoBackArrow from './GoBackArrow';
import WhatIs from './WhatIs';
import Card from './Card';
import Portfolio from './Portfolio';
import CheckForCards from './CheckForCards';

function Main() {
    const [cardsHidden, setCardsHidden] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const toggleCardsVisibility = () => {
        setCardsHidden(!cardsHidden);
    };

    const handleCardClick = (cardIndex) => {
        setSelectedCard(cardIndex);
        toggleCardsVisibility();
    };

    return (
        <main>
            {!cardsHidden ? (
                <div className="cards-container">
                    <Card className="card1" onClick={() => handleCardClick(0)} text="What is Marvel Snap" />
                    <Card className="card2" onClick={() => handleCardClick(1)} text="Check for cards" />
                    <Card className="card3" onClick={() => handleCardClick(2)} text="My Portfolio" />
                </div>
            ) : (
                <div className="expanded-card">
                    <GoBackArrow onClick={toggleCardsVisibility} />
                    {selectedCard === 0 && <WhatIs />}
                    {selectedCard === 1 && <CheckForCards />}
                    {selectedCard === 2 && <Portfolio />}
                </div>
            )}
        </main>
    );
}

export default Main;
