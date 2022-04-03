import React from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import './Hexa-Grid.css';
import shortid from 'shortid';
import { cardColumnNames } from '../../constants/general-strings/cardColumnNames';

const HexUnit = ({onClick, hexArray, hexCount, x,y, col, activeHex, isHexActive}) => {
    const [isActive, toggleActive] = React.useState(false)
    function detectClick() {
        onClick(hexCount, hexArray[hexCount])
        toggleActive(!isActive)
        if(hexCount == activeHex) {
            isHexActive()
        }else {
            isHexActive(hexCount)
        }
    }

    return (
        <Hexagon 
            className={`${activeHex == hexCount ? "Active":"Inactive" }`}
            onClick={() => detectClick()} 
            key={shortid.generate()} 
            q={x} r={-y-col} s={0} >
            <Text >{hexArray[hexCount] && (hexArray[hexCount][cardColumnNames.name]) }</Text>
        </Hexagon>)
}


const HexaGrid = ({hexArray, onClick}) => {
    const [activeHex, isHexActive] = React.useState()
    let hexagons = []
    const rows = 2
    const columns = 9;
    let hexCount = 0
    for(let x = 0; x< columns; x++){
        for(let y = 0; y< rows; y++){
            let col = Math.round(x/2)
            hexagons.push(
                <HexUnit 
                    onClick={onClick} 
                    hexArray={hexArray} 
                    hexCount={hexCount}
                    isHexActive={isHexActive}
                    activeHex={activeHex}
                    x={x}
                    y={y}
                    col={col}/>)
            hexCount++
        }
    }
    return (
        <div className="Battle-map" > 
            <HexGrid  width={1500} height={500} viewBox= "0 -150 470 200" >
                <Layout size={{ x: 35, y: 35 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
                    {hexagons}
                </Layout>
            </HexGrid>
        </div>
    )
}

export default HexaGrid