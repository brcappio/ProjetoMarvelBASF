import React, { useState } from 'react';
import CardsDatabase from '../data/CardsDatabase.json';


const CheckForCards = () => {
    const [cardImage, setCardImage] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardDescription, setMarvelDescription] = useState('');
    const [cardMarvelName, setMarvelName] = useState('');
    const [cardAbility, setCardAbility] = useState('');
    const [cardComics, setCardComics] = useState(0);
    const [cardStories, setCardStories] = useState(0);
    const [cardEvents, setCardEvents] = useState(0);
    const [cardSeries, setCardSeries] = useState(0);
    const [randomCard, setRandomCard] = useState(null);

    const getRandomCard = () => {
        const characterCards = CardsDatabase.card.filter(card => card.type === "Character");
        const mapCharacterName = (cardName) => {
            const nameMapping = {
                "Agent 13": "Sharon Carter",
                "Absorbing Man": "Carl Creel",
                "Agent Coulson": "Phil Coulson",
                "America Chavez": "Ms. America",
                "White Queen": "Emma Frost",
                
            };
        
            return nameMapping[cardName] || cardName;
        };

        if (characterCards.length > 0) {
            let randomIndex = Math.floor(Math.random() * characterCards.length);
            let randomCard = characterCards[randomIndex];

            while (randomCard.type === "Location") {
                randomIndex = Math.floor(Math.random() * characterCards.length);
                randomCard = characterCards[randomIndex];
            }

            if (randomCard.id) {
                const imageUrl = `https://images.marvelsnap.io/images/cards/${randomCard.id}.webp`;
                setCardImage(imageUrl);
            }

            if (randomCard.name) {
                const mappedCharacterName = mapCharacterName(randomCard.name);
                setCardName(randomCard.name);
                setRandomCard(randomCard);
                getMarvelCharacter(mappedCharacterName);
            }

            if (randomCard.ability) {
                setCardAbility(randomCard.ability);
            }

        }
    };  

    const getMarvelCharacter = async (characterName) => {
        const apiKey = '25e7182e47e20d66734bbda94de292d9';
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

        const queryParams = new URLSearchParams({
            nameStartsWith: characterName,
            apikey: apiKey,
        });

        const url = `${baseUrl}?${queryParams}`;

        try {
            const response = await fetch(url);
            const responseData = await response.json();

            if (responseData.data && responseData.data.results && responseData.data.results.length > 0) {
                const characterData = responseData.data.results[0];
                setMarvelName(characterData.name);

                if (characterData.description) {
                    setMarvelDescription(characterData.description);
                } else {
                    setMarvelDescription('No description available from the Marvel API');
                }

                setCardComics(characterData.comics.available);
                setCardStories(characterData.stories.available);
                setCardEvents(characterData.events.available);
                setCardSeries(characterData.series.available);
            } else {
                console.log(`Character "${characterName}" not found in the Marvel API.`);
            }
        } catch (error) {
            console.error('API Error:', error);
        }
    };


    return (
        <div className="checkforcards-container">
            <div className="checkforcards-title">
                <h2>Card Checker</h2>
            </div>
            <div className="checkforcards-btn-div">
                <button className="checkforcards-btn" onClick={() => getRandomCard()}>Get Random Card</button>
            </div>
            <div className="checkforcards-content">
                <div className="checkforcards-img">
                    {cardImage && <img src={cardImage} alt="Random Card" />}
                    {cardName && <p className='checkforcards-cardname'>{cardName}</p>}
                    {cardAbility && <p className='checkforcards-carddescription'>{cardAbility}</p>}
                </div>
                <div className="checkforcards-info">
                    <p>Name: {cardMarvelName}</p>
                    <p>Description: {cardDescription}</p>
                    <p>Comics: {cardComics}</p>
                    <p>Stories: {cardStories}</p>
                    <p>Events: {cardEvents}</p>
                    <p>Series: {cardSeries}</p>
                </div>
            </div>
        </div>
    );
};


export default CheckForCards;
