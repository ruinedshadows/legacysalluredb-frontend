import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { cardColumnNames } from '../../constants/general-strings/cardColumnNames';
import './Off-Canvas-Display.css';

const OffCanvasDisplay = ({show, handleClose, data}) => {
    return (
        <Offcanvas  className={"Off-canvas"} show={show} onHide={handleClose} scroll={true} backdrop={false} placement={'top'}>
            <Offcanvas.Header closeButton className="Off-canvas-title">
                <Offcanvas.Title><h2>{data[cardColumnNames.name]}</h2></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={"Off-canvas-body"}>
                <div>
                    Passive Abilities
                </div>
                <div>
                    Active Abilities
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default OffCanvasDisplay