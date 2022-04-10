import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import shortid from 'shortid';
import { cardColumnNames } from '../../constants/general-strings/cardColumnNames';
import { ConvertTableArrayToObject } from '../../shared-functions/ConvertTableArrayToObject';
import CardNameDisplay from '../card-name-display/Card-Name-Display';
import OffCanvasDisplay from '../off-canvas-display/Off-Canvas-Display';
import './DB-Table.css';

const TableHead = ({filter}) =>(
    <thead>
        <tr>
            {filter.map(column => (
                <th key={shortid.generate()}>{column}</th>
            ))}
        </tr>
    </thead>
)


const TableRow = ({displayClick, header, data, filter, isLinked, onClick}) => {
    
    let informationBlock = ConvertTableArrayToObject(data, header);
    return (
        <tr >
            {
                filter.map(element => {
                    if(element === cardColumnNames.name) {
                        return <td key={shortid.generate()}><CardNameDisplay data={informationBlock} placement={"right"} isLinked={isLinked} onClick={onClick}/></td>
                    }
                    if(element === cardColumnNames.abilities) {
                        return <td className="ability-column"
                                onClick= {() => displayClick(informationBlock)} 
                                key={shortid.generate()}>Show</td>
                    }
                    return <td key={shortid.generate()}>{informationBlock[element]}</td>})
            }
        </tr>
    )
}

const TableBody = ({header, data, filter, isLinked, onClick}) => {
    const [show, setShow] = useState(false);
    const [canvasInfo, setCanvasInfo] = useState({});
    const handleClose = () => setShow(false);
    function toggleShow (info){
        setShow(!show);
        setCanvasInfo(info);
    }
    const rows = data.map(element => {
        return <TableRow 
                    key={shortid.generate()}
                    displayClick={toggleShow} 
                    header={header}  
                    data={element}
                    filter={filter}
                    isLinked={isLinked}
                    onClick={onClick}>  
                </TableRow>;
    });
    return (
        <tbody>
            {rows}
            <OffCanvasDisplay show={show} handleClose={handleClose} data={canvasInfo}/>
        </tbody>
    )
}

const DBTable = ({header, data, filter, isLinked, onClick}) => (
    <Table responsive striped bordered hover variant="dark" className="DB-table">
        <TableHead filter={filter}></TableHead>
        <TableBody header={header} data={data} filter={filter} isLinked={isLinked} onClick={onClick}></TableBody>
    </Table>
)

export default DBTable;