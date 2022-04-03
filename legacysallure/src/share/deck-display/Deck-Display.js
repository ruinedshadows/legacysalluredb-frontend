import React from 'react';
import { Card } from 'react-bootstrap';
import shortid from 'shortid';
import { deckColumnNames } from '../../constants/general-strings/deckColumnNames';
import CardNameDisplay from '../card-name-display/Card-Name-Display';
import "./Deck-Display.css";


const DeckDisplay = ({data, isLinked, onClick}) => (
    <Card className="Deck-display">
        <div>
            <Card.Body className="Deck-display-first-body">
                {
                    data[deckColumnNames.cards].map((card, index) => (
                        <CardNameDisplay key={shortid.generate()} data={card} placement={"top"} isLinked={isLinked} onClick={onClick} index={index}/>))
                }
            </Card.Body>
            <Card.Body className="Deck-display-second-body">
                <div>
                    {data[deckColumnNames.user]}
                </div>
            </Card.Body>
            {
                data[deckColumnNames.created_date] && (
                    <Card.Footer className="text-muted">
                        {data[deckColumnNames.created_date]}
                    </Card.Footer>)
            }
        </div>
    </Card>
)

export default DeckDisplay;