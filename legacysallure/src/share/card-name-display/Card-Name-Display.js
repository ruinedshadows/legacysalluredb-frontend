import React from 'react';
import { Card, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import shortid from 'shortid';
import numberedUnitColumnNames from '../../constants/column-names/numberedUnitColumnNames';
import { cardColumnNames } from '../../constants/general-strings/cardColumnNames';
import StatIcons from '../../constants/icons/statIcons';
import ImgList from '../../constants/imgList';
import { ConvertColumnArray } from '../../shared-functions/ConvertColumnArray';
import './Card-Name-Display.css'

function SmallDisplay (e,data) {
    let displayText = []
    for(var key in data) {
        if( parseInt(data[key]) == NaN && key != cardColumnNames.name )
        {  
            displayText.push(
                <Card.Text key={shortid.generate()}>{key} {data[key]}</Card.Text>
            )
        } else if(data[key]> 0 && key != cardColumnNames.gold) {
            displayText.push(
                <Card.Text className={"Display-text"} key={shortid.generate()}>{StatIcons[key]} {data[key]}</Card.Text>
            )
        }                            
    }
    return (
        <Popover  {...e} className={"Small-display"}>
            <Popover.Body>
                <Card >
                    <div>                            
                        <Card.Header className={"Display-header"}>
                            <Card.Title id={"name"}>{data[cardColumnNames.name]}</Card.Title>
                            <Card.Title id={"gold"}>{StatIcons[cardColumnNames.gold]} {data[cardColumnNames.gold]}</Card.Title>
                        </Card.Header>
                    </div>
                    <div className={"Display-card"}>
                        <Card.Body className={"Display-first-body"}>
                        </Card.Body>
                        <Card.Img id={"img"} src={ImgList.placeholder} style={{ width: '190px', height: '200px' }}/>
                    </div>
                    <div>                            
                        <Card.Body className={"Display-stats"}>
                            {displayText}
                        </Card.Body>
                    </div>
                </Card>
            </Popover.Body>
        </Popover >
    )
    
}


const CardNameDisplay = ({data, placement}) => {
    let infoBlock = ConvertColumnArray(data, numberedUnitColumnNames)
    return (
        <OverlayTrigger
            placement={placement}
            delay={{ show: 5, hide: 10 }}
            overlay={(e) => SmallDisplay(e,infoBlock)}>
            <a className={"Name-link"} href={`/card/info:${infoBlock[cardColumnNames.name]}`}>
                {infoBlock[cardColumnNames.name]}
            </a>
        </OverlayTrigger>
    )
}

export default CardNameDisplay;