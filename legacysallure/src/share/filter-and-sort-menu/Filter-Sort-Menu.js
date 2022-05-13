import './Filter-Sort-Menu.css'
import React from 'react'
import { cardColumnNames } from '../../constants/general-strings/cardColumnNames'
import { ConvertTableArrayToObject } from '../../shared-functions/ConvertTableArrayToObject'
import { Accordion, Button, ButtonGroup, Dropdown, Offcanvas, ToggleButton } from 'react-bootstrap'
import IconButton from '../icon-button/Icon-Button'
import buttonIcons from '../../constants/icons/buttonIcons'
import { ConvertRowsToPages } from '../../shared-functions/ConvertRowsToPages'
const radioFilterChoice = [
    {name:"And", value:true},
    {name:"Or", value:false}
]

function runThroughFilters(deck, cardArray, columnName, filterEntry) {
    deck.forEach(card => {
        if (Array.isArray(card)) card = ConvertTableArrayToObject(card, cardColumnNames)
            if( filterEntry === card[columnName]) {
                cardArray.push(card)
        }
    })
    return cardArray
}

const FilterSortMenu = ({deckData, filterChange, cardsLimit}) => {
    const [filterValues, changeFilterValues] = React.useState([])
    const [radioValue, setAndOrRadioValue] = React.useState(true)
    const [show, setShow] = React.useState(false);
    const [sortName, setSortName] = React.useState(cardColumnNames.id);
    const [isDescending, setIsDescending] = React.useState(true);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let filterOptions = {}
    function applyFilter(newFilterValues) {
        let cardArray = []
        newFilterValues.forEach((filter, index) => {
            const columnName = filter["option"]
            const filterValue = filter["value"]
            const filterConditional = filter["conditional"]
            if(index === 0){
                cardArray = runThroughFilters(deckData, cardArray, columnName, filterValue)
            } else if (!filterConditional) {
                cardArray = runThroughFilters(deckData, cardArray, columnName, filterValue)
            } else if (filterConditional) {
                let newFilterArray = []
                cardArray.forEach(filterEntry => {
                    if((filterEntry[columnName] === filter["value"])) {
                        newFilterArray.push(filterEntry)
                     }
                })
                cardArray = newFilterArray
            }
        })
        let cards = []
        cardArray.forEach(card => {
            const index = cards.findIndex(entry => (card[cardColumnNames.id] === entry[cardColumnNames.id]))
            if (index === -1) cards.push(card)
        })
        let isNumber = false
        if(cards.length > 0 && parseInt(cards[0][sortName]) != NaN) {
            isNumber = true
        }  
        cards = sortFilteredValues(cards, sortName, isNumber, isDescending)
        let {page, pageNum} = ConvertRowsToPages(cards.length, cardsLimit, cards)
        filterChange(page, pageNum)
    }

    function detectFilterClick(option, value) {
        let tempFilterValues = filterValues
        tempFilterValues.push({value:value, option:option, conditional:radioValue})
        changeFilterValues(tempFilterValues)
        applyFilter(tempFilterValues)
    }

    function deleteFilterChoice(filter, value) {
        const filterIndex = filterValues.findIndex((entry)=> (entry["option"] === filter && entry["value"] === value))
        let filterArray = filterValues.slice()
        filterArray.splice(filterIndex,1)
        changeFilterValues(filterArray)
        applyFilter(filterArray)
    }

    function setRadioButtonValue(newRadioValue) {
        setAndOrRadioValue(newRadioValue)
    }

    function sortFilteredValues(values, column, isNumber, isDescending) {
        if(isNumber) {
            values.sort((first, last) => {
                if (isDescending) {
                    return first[column]-last[column]
                }
                return last[column]-first[column]
            })
        } else {
            values.sort((first, last) => {       
                if (isDescending) { 
                    if(first[column] < last[column]) { return -1; }
                    if(first[column] > last[column]) { return 1; }
                    return 0;
                }
                if(first[column] > last[column]) { return -1; }
                if(first[column] < last[column]) { return 1; }
                return 0;
            })
        }
        return values
    }

    function changeSorting(sortType) {
        setIsDescending(sortType)
        applyFilter(filterValues)
    }

    deckData.forEach(card => {
        if (Array.isArray(card)) card = ConvertTableArrayToObject(card, cardColumnNames)
        Object.entries(card).forEach(entry => {
            const columnName = entry[0]
            const columnEntry = entry[1]
            if(!Array.isArray(filterOptions[columnName])) filterOptions[columnName] = []
            if(filterOptions[columnName].findIndex(value => (value === columnEntry)) === -1){ 
                filterOptions[columnName].push(columnEntry)
            }
        })
    })
    return (
        <div>
            <div className={"filter-sort-buttons"}>
                <Button className={"alter-button"} variant="primary" onClick={handleShow}>
                    Filter
                </Button>
                <div className={"sort-buttons"}>
                    {
                        <div>
                            {Object.entries(filterOptions).map((entry) => {
                                const option = entry[0]
                                return (
                                    sortName === option ?
                                    (<Button className={"alter-button"} variant="primary" onClick={() => setSortName(cardColumnNames.id)}>
                                        {option}
                                    </Button>):
                                    (<Button className={"alter-button"} variant="outline-primary" onClick={() => setSortName(option)}>
                                        {option}
                                    </Button>)
                                )
                                
                            })}

                        </div>
                    }
                </div>
                <div>
                    {
                        isDescending ? 
                        <IconButton icon={buttonIcons.asc} onClick={()=> changeSorting(false)}></IconButton>:
                        <IconButton icon={buttonIcons.desc} onClick={()=> changeSorting(true)}></IconButton>
                    }
                </div>
            </div>
            <div className={"filter-buttons"}>
                {
                    filterValues.map(filterEntry => (
                            <Button 
                                className={"filter-button"} 
                                variant="outline-primary" 
                                onClick={() => {deleteFilterChoice(filterEntry["option"], filterEntry["value"])}}>
                                    
                                    { (filterEntry["conditional"])? "And": "Or"} | {filterEntry["option"]}: {filterEntry["value"]} {buttonIcons.cancel}
                            </Button>
                        ))
                }
            </div>
            <Offcanvas show={show} onHide={handleClose} className={"offcanvas-filter"}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                {
                    <div>
                        <ButtonGroup className="choice-button-group">
                            {
                                radioFilterChoice.map((btn, index) => (
                                    <ToggleButton 
                                        key={index} 
                                        variant={radioValue === btn.value ? 'outline-primary' : 'outline-secondary'}
                                        type = "radio" 
                                        value={btn.value} 
                                        checked={radioValue === btn.value}
                                        onClick={()=> (setRadioButtonValue(btn.value))}>{btn.name}
                                    </ToggleButton>
                                ))
                            }
                        </ButtonGroup>
                        <Accordion>
                            {Object.entries(filterOptions).map((entry, index) => {
                                const option = entry[0]
                                const optionValues = entry[1]
                                return (
                                    (option !== cardColumnNames.id && option !== cardColumnNames.faction && option !== cardColumnNames.name) &&
                                        <div className={"filter-sort-menu"}>
                                            <Accordion.Item eventKey={index}>
                                                <Accordion.Header className={"filter-header"}>
                                                    {option}
                                                </Accordion.Header>
                                                <Accordion.Body className={"filter-sort-body"}>
                                                    {
                                                        optionValues.map((value, index) => (
                                                            (filterValues.findIndex(filterValue => (filterValue["option"] === option && filterValue["value"] === value)) === -1) ?
                                                            <Button className={"filter-choice-button"} variant={'outline-primary'} onClick={()=> {detectFilterClick(option, value)}} >
                                                                {value}
                                                            </Button>:
                                                            <Button className={"filter-choice-button"} variant={'primary'} onClick={()=> {deleteFilterChoice(option, value)}}>
                                                                {value}
                                                            </Button>
                                                        ))
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </div>
                                )
                            })}
                        </Accordion>
                    </div>
                }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default FilterSortMenu