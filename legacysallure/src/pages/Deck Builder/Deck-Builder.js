import React from 'react';
import CardSize from '../../constants/card-sizes/cardUnitSize';
import CardUnit from '../../share/card-unit/Card-Unit';
import PaginationItems from '../../share/pagination/Pagination-Tool';
import DBTable from '../../share/table/DB-Table';
import HexaGrid from '../../share/hexa-grid/Hexa-Grid';
import './Deck-Builder.css';
import { ConvertRowsToPages } from '../../shared-functions/ConvertRowsToPages';
import DeckDisplay from '../../share/deck-display/Deck-Display';
import { deckColumnNames } from '../../constants/general-strings/deckColumnNames';
import AddDeleteDisplay from '../../share/add-delete-display/Add-Delete-Display';
import { cardColumnNames } from '../../constants/general-strings/cardColumnNames';
import shortid from 'shortid';
import CardTypeDisplay from '../../share/card-type-display/Card-Type-Display';
import HeroDisplay from '../../share/hero-display/Hero-Display';

const DeckBuilder = () => {
    const cardNum = 2033;
    const cardsLimit = 10;
    const cardJump = Math.round((cardNum/cardsLimit)/6);
    let rows = [];
    for(var x = 1; x<=cardNum; x++) {
        rows.push([x, "Test Name", x, 100, 2, 2, 10, 4, "Test Faction", "Item"])
    }
    
    let deck ={}
    rows.forEach(entry => (
        deck[entry[0]]={"count":0 ,[cardColumnNames.name]:entry[1], [cardColumnNames.gold]:entry[2], [cardColumnNames.type]:entry[9]}
    ))
    const [activeNum, changeActiveNum] = React.useState(1);
    const [deckListCardIndex, changeDeckListCardIndex] = React.useState();
    const [cardID, changeCardID] = React.useState();
    const [activeCard, changeActiveCard] = React.useState({});
    const [cardCounter, changeCardCounter] = React.useState(deck);
    const [newDeck, alterDeck] = React.useState(
        Object.assign({}, {}, {[deckColumnNames.cards]:[]})
    )
    const [hexArray, changeHexArray] = React.useState(Array(18));
    const [activeHeroId, changeHeroID] = React.useState(1);


    function onClick(num) {
        changeActiveNum(num);
    }
    function rowClick(row, index) {
        changeActiveCard(row);
        changeDeckListCardIndex(index)
        changeCardID(row["newDeckId"])
    }
    function forwardClick() {
        changeActiveNum(activeNum+1);
    }
    function backwardClick() {
        changeActiveNum(activeNum-1);
    }
    function skipForwardClick() {
        changeActiveNum(activeNum+cardJump);
    }
    function skipBackwardClick() {
        changeActiveNum(activeNum-cardJump);
    }

    function detectCardContent(change) {
        changeCardCounter(Object.assign({}, 
            cardCounter, 
            {[activeCard[cardColumnNames.id]]:Object.assign({}, cardCounter[activeCard[cardColumnNames.id]], {"count":cardCounter[activeCard[cardColumnNames.id]]["count"]+change})
                }))
    }

    function addToDeck() {
        let cardDeck = []
        cardDeck = newDeck[deckColumnNames.cards].slice();
        const id = shortid.generate()
        cardDeck.push(Object.assign({}, activeCard,  {"newDeckId":id}))
        let newIndex = cardDeck.length
        alterDeck(Object.assign({}, newDeck, {[deckColumnNames.cards]:cardDeck}))
        detectCardContent(1)
        changeDeckListCardIndex(newIndex)
        changeCardID(id)
    }

    function deleteFromDeck() {
        let cardDeck = newDeck[deckColumnNames.cards].slice()
        const cardIndex= newDeck[deckColumnNames.cards].findIndex(
            (item) =>(item[cardColumnNames.id] === activeCard[cardColumnNames.id]))
        cardDeck.splice(cardIndex, 1)
        alterDeck(Object.assign({}, newDeck, {[deckColumnNames.cards]:cardDeck}))
        readjustHexArray(cardIndex)
        detectCardContent(-1)
        changeDeckListCardIndex(null)
    }

    function setHexPlacement(hexIndex) {
        if(cardID){
        let newHexArray = hexArray
        let index = hexArray.findIndex(
            (entry) => {
                if(entry){
                    return  entry["newDeckId"] === cardID
                }
            }
        )

        if(index>=0) {
            newHexArray.splice(
                index, 
                1,
                Object.assign({}, 
                {}, 
                {}))
            changeHexArray(newHexArray)
        }
        newHexArray.splice(
            hexIndex, 
            1,
            Object.assign({}, 
            newDeck[deckColumnNames.cards][deckListCardIndex]))
        changeHexArray(newHexArray)}
    }
    
    function readjustHexArray() {
        let newHexArray = hexArray
        let hexIndex = newHexArray.findIndex(
            (entry) => {
                if(entry){
                    return  entry["newDeckId"] === cardID
                }
            }
        )
        newHexArray.splice(
            hexIndex, 
            1,
            Object.assign({}, 
            {}, 
            {}))        
        changeHexArray(newHexArray)
        const nextCard = newDeck[deckColumnNames.cards].find(entry =>{
            if(entry) return entry[cardColumnNames.id] === activeCard[cardColumnNames.id] && entry["newDeckId"] != activeCard["newDeckId"] 
            }
        )
        if(nextCard){
            changeActiveCard(nextCard)
            const newCardId = hexArray.find(entry => {
                if(entry) return entry["newDeckId"] === nextCard["newDeckId"]}
            )
            if (newCardId) {
                changeCardID(newCardId["newDeckId"])
            }else {
                changeCardID(null)
            }
        }else {
            changeCardID(null)
        }
    }

    function chooseHero(heroId) {
        alterDeck(Object.assign({}, {}, {[deckColumnNames.cards]:[]}))
        changeActiveCard({})
        changeCardCounter(deck)
        changeHexArray(Array(18))
        changeHeroID(heroId)
    }

    let {page, pageNum} = ConvertRowsToPages(cardNum, cardsLimit, rows)
    return (
        <div className="Display Deck-builder-page">
            <h1>Legacy's Allure DB</h1>
            <h2>Deck Builder</h2>
            <div className="hero-section">
                <HeroDisplay heroInfo={rows[activeHeroId]} onClick={chooseHero}/>
            </div>
            <div className="Top-side">
                {
                    (activeCard[cardColumnNames.name])&&
                        <div className="Left-side">
                            <div className="Card-display">
                                <CardUnit data={activeCard} dimensions={CardSize.deckBuilderCard}/>
                            </div>
                            <div className="Card-selection">
                                <AddDeleteDisplay 
                                    onAddClick={addToDeck} 
                                    onDeleteClick={deleteFromDeck} 
                                    cardCounter={cardCounter[activeCard[cardColumnNames.id]]["count"]} />
                            </div>
                        </div>
                }
                {
                    (activeCard[cardColumnNames.name])&&
                <div className="middle-part">
                    <CardTypeDisplay cardCounter={cardCounter} deck={newDeck[deckColumnNames.cards]} onClick={rowClick}></CardTypeDisplay>
                </div>}
                <div className="Right-side">
                    <PaginationItems 
                        cardJump={cardJump} 
                        onClick={onClick} 
                        forwardClick={forwardClick} 
                        backwardClick={backwardClick} 
                        skipForwardClick={skipForwardClick} 
                        skipBackwardClick={skipBackwardClick} 
                        currentNum={activeNum} pageNum={pageNum} activeNum={activeNum}/>
                    <DBTable 
                        header={cardColumnNames} 
                        data={page[activeNum]} 
                        filter={[cardColumnNames.name, cardColumnNames.gold, cardColumnNames.abilities]} onClick={rowClick} />
                </div>
            </div>
            {
                newDeck[deckColumnNames.cards] && (
                <div className="Bottom-side">
                    <DeckDisplay data={newDeck} onClick={rowClick}/>
                </div>
                )
            }
            <div className="Hexa-grid-mat">
                <HexaGrid hexArray={hexArray} onClick={setHexPlacement} />
            </div>
        </div>
    )
}

export default DeckBuilder