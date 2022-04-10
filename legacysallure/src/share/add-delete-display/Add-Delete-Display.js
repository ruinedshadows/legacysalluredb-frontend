import React from 'react';
import deckBuildingIcons from '../../constants/icons/deckBuildingIcons';
import IconButton from '../icon-button/Icon-Button';
import './Add-Delete-Display.css'

const AddDeleteDisplay = ({onAddClick, onDeleteClick, cardCounter}) => {
    return (
        <div className="Add-delete-toolbar">
            <div className="Add-button">
                <IconButton icon={deckBuildingIcons.add} onClick={onAddClick}/>
            </div>
            <div className="Card-counter">
                {cardCounter}
            </div>
            <div className="Delete-button">
                { cardCounter > 0 && 
                    (<IconButton icon={deckBuildingIcons.delete} onClick={onDeleteClick}/>)
                }
            </div>
        </div>
    )
}

export default AddDeleteDisplay