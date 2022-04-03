import React from 'react'
import { Accordion } from 'react-bootstrap'
import { cardTypeArray } from '../../constants/general-strings/cardTypeArray'
import { cardColumnNames } from '../../constants/general-strings/cardColumnNames';
import CardNameDisplay from '../card-name-display/Card-Name-Display';
import './Card-Type-Display.css'

const TypeRow = ({cardInfo,cardTypeInfo, onClick, index}) => (
    <div className={"type-row-display"}>
        <span className={"type-row-count"}>
            {cardTypeInfo["count"]} x
        </span>
        <span className={"type-row-name"}>
            <CardNameDisplay data={cardInfo} isOverlayed={false} onClick={onClick} index={index}></CardNameDisplay>
        </span>
        <span className={"type-row-cost"}>
            Cost: {cardTypeInfo[cardColumnNames.gold]*cardTypeInfo["count"]}
        </span>
    </div>

)
const CardTypeDisplay = ({deck,cardCounter, onClick}) => {
    let typeList = {}
    let totalCost = 0
    let totalCards = 0
    Object.keys(cardCounter).filter(id => (cardCounter[id]["count"] > 0)).forEach(id => {
        if(typeList[cardCounter[id][cardColumnNames.type]]) {
            typeList[cardCounter[id][cardColumnNames.type]].push(Object.assign({}, cardCounter[id], {[cardColumnNames.id]:id}))
            totalCards = totalCards + cardCounter[id]["count"]
            totalCost = totalCost + cardCounter[id][cardColumnNames.gold] *cardCounter[id]["count"]

        } else {
            typeList[cardCounter[id][cardColumnNames.type]]=[]
            typeList[cardCounter[id][cardColumnNames.type]].push(Object.assign({}, cardCounter[id], {[cardColumnNames.id]:id}))
            totalCards = totalCards + cardCounter[id]["count"]
            totalCost = totalCost + cardCounter[id][cardColumnNames.gold]*cardCounter[id]["count"]
        }
    })
    return (
        <div>
            <div className={"total-display"}>
                <h4>
                    Total Cards: {totalCards}
                </h4>
                <h4>
                    Total Cost: {totalCost}
                </h4>
            </div>
            <Accordion  flush alwaysOpen={true}>
                {
                    cardTypeArray.map((type, index) => 
                    type!= "Hero" &&
                        <Accordion.Item eventKey={index}>
                            <Accordion.Header>
                                {type}
                            </Accordion.Header>
                            <Accordion.Body>
                                {(typeList[type]) && 
                                    typeList[type].map(entry => (
                                        <TypeRow cardInfo={deck.find(cardEntry => cardEntry[cardColumnNames.id] == entry[cardColumnNames.id])} cardTypeInfo={entry} onClick={onClick} index={entry[cardColumnNames.id]}></TypeRow>
                                    ))
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        )
                }
            </Accordion>
        </div>
    )
}

export default CardTypeDisplay