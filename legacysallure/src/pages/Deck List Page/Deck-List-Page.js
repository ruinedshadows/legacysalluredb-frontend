import React from 'react';
import { Accordion, useAccordionButton } from 'react-bootstrap';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import shortid from 'shortid';
import numberedDeckColumnNames from '../../constants/column-names/numberedDeckColumnNames';
import { deckColumnNames } from '../../constants/general-strings/deckColumnNames';
import DeckDisplay from '../../share/deck-display/Deck-Display';
import DeckUnit from '../../share/deck-unit/Deck-Unit';
import PaginationItems from '../../share/pagination/Pagination-Tool';
import './Deck-List-Page.css'


function AccordionDeck({ eventKey, callback, deckColumns }) {

    const onClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
      );
      return (
        <span onClick={onClick}>
            <DeckUnit 
                key={shortid.generate()} 
                title={deckColumns[deckColumnNames.name]} 
                desc={deckColumns[deckColumnNames.description]}
                data={deckColumns}>  
            </DeckUnit>  
        </span>
      )
}

const DeckListPage = () => {
    const cardNum = 2037;
    const cardsLimit = 5;
    const cardJump = Math.round((cardNum/cardsLimit)/6);
    const [activeNum, changeActiveNum] = React.useState(1);
    function onClick(num) {
        changeActiveNum(num);
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
    const testRowData = [
        "Test Deck Name",
        "Test Creation Date",
        "Test Updated Date",
        "Test Version",
        "Test Faction",
        "Test Tournament Legality",
        Array(18).fill(["Test Name", 1, 100, 2, 2, 10, 4, "Test Faction", "Test Type"]),
        "Test User",
        "Test Description"
    ];
    let deckColumns = {}
    let page = {};
    let pageNum = 1;
    let pageEntries = [];
    let pageCount = 0;
    for(var x = 1; x<=cardNum; x++) {
        pageCount++;
        testRowData.forEach((columnName, index) => {
            deckColumns[numberedDeckColumnNames[index+1]] = columnName;
        });
        pageEntries.push(
            <div key={shortid.generate()}>
                <Accordion.Item eventKey={x}>
                    <Accordion.Header>
                        <DeckUnit 
                            key={shortid.generate()} 
                            title={deckColumns[deckColumnNames.name]} 
                            desc={deckColumns[deckColumnNames.description]}
                            data={deckColumns}>  
                        </DeckUnit>  
                    </Accordion.Header>
                    <Accordion.Body>
                        <DeckDisplay  data={deckColumns} />
                    </Accordion.Body>
                </Accordion.Item>
            </div>);
        
        if (pageCount === cardsLimit || x === cardNum) {
            page[pageNum] = pageEntries;
            pageEntries = [];
            pageCount = 0;
            if(x !== cardNum) pageNum++;
        }
    }
    return (
        <div className="Deck-page">
            <h1>Legacy's Allure DB</h1>
            <h2>Deck List</h2>
            <span className="Deck-items">
                <PaginationItems 
                        cardJump={cardJump} 
                        onClick={onClick} 
                        forwardClick={forwardClick} 
                        backwardClick={backwardClick} 
                        skipForwardClick={skipForwardClick} 
                        skipBackwardClick={skipBackwardClick} 
                        currentNum={activeNum} pageNum={pageNum} activeNum={activeNum}/>
                <Accordion className="Deck-list" flush>{page[activeNum]}</Accordion>
                <PaginationItems 
                        cardJump={cardJump} 
                        onClick={onClick} 
                        forwardClick={forwardClick} 
                        backwardClick={backwardClick} 
                        skipForwardClick={skipForwardClick} 
                        skipBackwardClick={skipBackwardClick} 
                        currentNum={activeNum} pageNum={pageNum} activeNum={activeNum}/>
            </span>
        </div>
    )
}

export default DeckListPage;