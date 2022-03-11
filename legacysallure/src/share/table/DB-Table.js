import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import shortid from 'shortid';
import { ConvertColumnArray } from '../../shared-functions/ConvertColumnArray';
import CardNameDisplay from '../card-name-display/Card-Name-Display';
import OffCanvasDisplay from '../off-canvas-display/Off-Canvas-Display';
import './DB-Table.css';

const TableHead = ({headerRow}) => {
    let entries = []
    for(var key in headerRow) {
        entries.push(<th key={shortid.generate()}>{headerRow[key]}</th>)
    }
    return (
        <thead>
            <tr>
                {entries}
            </tr>
        </thead>
    )
}

const TableRow = ({onClick, header, data}) => {
    let infoBlock = ConvertColumnArray(data, header)
    const rows = data.map((element, index) => {
        if(index === 0) {
            return <td key={shortid.generate()}><CardNameDisplay data={data} placement={"right"}/></td>
        }
        return <td key={shortid.generate()}>{element}</td>
    });

    return (
        <tr onClick= {() => onClick(infoBlock)}>
            {rows}
        </tr>
    )
}

const TableBody = ({header, data}) => {
    const [show, setShow] = useState(false);
    const [canvasInfo, setCanvasInfo] = useState({});
    const handleClose = () => setShow(false);
    function toggleShow (info){
        setShow(true);
        setCanvasInfo(info);
    }
    let informationBlock = {};
    const rows = data.map(element => {
        return <TableRow 
                    key={shortid.generate()} 
                    onClick={toggleShow} 
                    infoBlock={informationBlock}
                    header={header}  
                    data={element}>  
                </TableRow>;
    });
    return (
        <tbody>
            {rows}
            <OffCanvasDisplay show={show} handleClose={handleClose} data={canvasInfo}/>
        </tbody>
    )
}

const DBTable = ({header, data}) => (
    <Table responsive striped bordered hover variant="dark" className="DB-table">
        <TableHead headerRow={header}></TableHead>
        <TableBody header={header} data={data}></TableBody>
    </Table>
)

export default DBTable;