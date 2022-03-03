import React from 'react';
import { Card } from 'react-bootstrap';
import './Display-Box.css';
import imgList from '../../constants/imgList';
import shortid from 'shortid';

const DisplayCard = ({cardInfo}) => (
    <div className="Display-card">
        <Card style={{ width: '15rem' }}>
            <Card.Body>
                <Card.Img variant='top' src={imgList.placeholder} />
                <Card.Title className="Display-title">
                    {cardInfo.title}
                </Card.Title>
                <Card.Text className="Display-text">
                    {cardInfo.text}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
    
)

function DisplayBox({title}) {
    let cardDisplay = []
    const cardInfoExample = {
        "title":"Placeholder",
        "text":"Placeholder Text"
    }
    for(var x = 0; x<=15; x++) {
        cardDisplay.push(<DisplayCard key={shortid.generate()} cardInfo={cardInfoExample} />)
    }
    return (
        <div className="Display Display-box">
            <header>
                {title}
            </header>
            <div className="Cards">
                {cardDisplay}
            </div>
        </div>
    )
}

export default DisplayBox;