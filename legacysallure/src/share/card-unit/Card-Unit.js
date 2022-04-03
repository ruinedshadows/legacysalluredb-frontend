import React from 'react';
import { Card} from 'react-bootstrap';
import shortid from 'shortid';
import { cardColumnNames } from '../../constants/general-strings/cardColumnNames';
import StatIcons from '../../constants/icons/statIcons';
import ImgList from '../../constants/imgList';
import './Card-Unit.css'


function CardUnit ({data, dimensions}) {
    let displayText = []
    for(var key in data) {
        if( parseInt(data[key]) === NaN && key !== cardColumnNames.name )
        {  
            displayText.push(
                <Card.Text key={shortid.generate()}>{key} {data[key]}</Card.Text>
            )
        } else if(data[key]> 0 && key !== cardColumnNames.gold && key !== cardColumnNames.id) {
            displayText.push(
                <Card.Text className={"Display-text"} key={shortid.generate()}>{StatIcons[key]} {data[key]}</Card.Text>
            )
        }                            
    }
    return (
        <Card className="Unit-display" >
            <div>                            
                <Card.Header className={"Display-header"}>
                    <Card.Title id={"name"}>{data[cardColumnNames.name]}</Card.Title>
                    <Card.Title id={"gold"}>{StatIcons[cardColumnNames.gold]} {data[cardColumnNames.gold]}</Card.Title>
                </Card.Header>
            </div>
            <div className={"Display-card"}>
                <Card.Body className={"Display-first-body"}>
                </Card.Body>
                <Card.Img id={"img"} src={ImgList.placeholder} style={{ width: dimensions.width, height: dimensions.height }}/>
            </div>
            <div>                            
                <Card.Body className={"Display-stats"}>
                    {displayText}
                </Card.Body>
            </div>
        </Card>
    )
    
}
export default CardUnit