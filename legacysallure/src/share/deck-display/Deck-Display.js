import React from 'react';
import { Card } from 'react-bootstrap';
import shortid from 'shortid';
import numberedUnitColumnNames from '../../constants/column-names/numberedUnitColumnNames';
import { deckColumnNames } from '../../constants/general-strings/deckColumnNames';
import { ConvertColumnArray } from '../../shared-functions/ConvertColumnArray';
import CardNameDisplay from '../card-name-display/Card-Name-Display';
import "./Deck-Display.css";


const DeckDisplay = ({data}) => (
    <Card className="Deck-display">
        <div>
            <Card.Body className="Deck-display-first-body">
                {data[deckColumnNames.cards].map(card => (<CardNameDisplay key={shortid.generate()} data={card} placement={"top"} />))}
            </Card.Body>
            <Card.Body className="Deck-display-second-body">
                <div>
                    {data[deckColumnNames.user]}
                </div>
            </Card.Body>
            <Card.Footer className="text-muted">{data[deckColumnNames.created_date]}</Card.Footer>
        </div>
    </Card>
)

export default DeckDisplay;