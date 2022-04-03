import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import ImgList from '../../constants/imgList';
import { CRUDCardActions } from '../../redux/actions/card-info';
import "./Deck-Unit.css";

const DeckUnit = ({title, data, desc, SaveCardInfo,dimensions}) => (
    <Card className="Whole-deck">
        <div className="Deck-content">
            <span className="Deck-img">
                <Card.Img variant="top" src={ImgList.placeholder} style={{ width: dimensions.width, height: dimensions.height }}/>
            </span>
            <Card.Body className="Deck-body">
                <Card.Title className="Deck-title" onClick={() => SaveCardInfo(data)} >
                {title}
                    {/* <a className={"Name-link"} href={`/deck/info:${title}`}>
                        {title}
                    </a> */}
                </Card.Title>
                <Card.Text className="Deck-description">
                    {desc}
                </Card.Text>
            </Card.Body>
        </div>
    </Card>
)

export default DeckUnit;