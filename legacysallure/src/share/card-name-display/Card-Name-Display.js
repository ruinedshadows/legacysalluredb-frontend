import React from 'react';
import { OverlayTrigger, Popover,  } from 'react-bootstrap';
import CardSize from '../../constants/card-sizes/cardUnitSize';
import { cardColumnHeaders } from '../../constants/column-names/cardColumnHeaders.ts';
import { cardColumnNames } from '../../constants/general-strings/cardColumnNames';
import { ConvertColumnArray } from '../../shared-functions/ConvertColumnArray';
import CardUnit from '../card-unit/Card-Unit';
import './Card-Name-Display.css'

function SmallDisplay (e,data) {
    return (
        <Popover  {...e} className={"Small-display"}>
            <Popover.Body>
                <CardUnit data={data} dimensions={CardSize.toolTipCard} />
            </Popover.Body>
        </Popover >
    )
    
}


const CardNameDisplay = ({data, placement, isLinked, onClick, index, isOverlayed = true}) => {
    let infoBlock = {}
    if(Array.isArray(data)) infoBlock = ConvertColumnArray(data, cardColumnHeaders)
    else { infoBlock = data }
    return (
        isOverlayed ?
        (<OverlayTrigger
            placement={placement}
            delay={{ show: 5, hide: 10 }}
            overlay={(e) => SmallDisplay(e,infoBlock)}>
            
            {
                isLinked ? (
                <a className={"Name-link"} href={`/card/info:${infoBlock[cardColumnNames.name]}`}>
                    {infoBlock[cardColumnNames.name]}
                </a>
                ):
                (
                    <div className={"Name-no-link"} onClick={() => onClick(infoBlock, index)}>
                        {infoBlock[cardColumnNames.name]}
                    </div>
                )
            }
        </OverlayTrigger>) :
        (<div className={"Name-no-link"} onClick={() => onClick(infoBlock, index)}>
            {infoBlock[cardColumnNames.name]}
        </div>)
    )
}

export default CardNameDisplay;