import React from 'react';
import PaginationItems from '../../share/pagination/Pagination-Tool';
import './Card-List-Page.css';
import DBTable from '../../share/table/DB-Table';
import numberedUnitColumnNames from '../../constants/column-names/numberedUnitColumnNames';

const CardListPage = () => {
    const cardNum = 2031;
    const cardsLimit = 20;
    const cardJump = Math.round((cardNum/cardsLimit)/6);
    let pageNum = 0;
    const [activeNum, changeActiveNum] = React.useState(1);
    function onClick(num) {
        changeActiveNum(num);
    }
    function forwardClick() {
        changeActiveNum(activeNum+1);
    }
    function backwardClick() {
        changeActiveNum(activeNum-1);
    }
    function skipForwardClick() {
        changeActiveNum(activeNum+cardJump);
    }
    function skipBackwardClick() {
        changeActiveNum(activeNum-cardJump);
    }
    let rows = [];
    for(var x = 1; x<=cardNum; x++) {
        rows.push(["Test Name", x, 100, 2, 2, 10, 4, "Test Faction", "Test Type"])
    }
    const testRow = numberedUnitColumnNames;
    let page = {};
    let unfilledPage = 1;
    let pageEntries = [];
    let pageCount = 0;
    rows.forEach((entry, index) => {
        pageEntries.push(entry)
        if (pageCount === cardsLimit || index === cardNum-1) {
            page[unfilledPage] = pageEntries;
            pageEntries = [];
            pageNum = unfilledPage;
            pageCount = 0;
            unfilledPage++;
        }
        pageCount++;
    })
    return (
        <div className="Card-page">
            <h1>Legacy's Allure DB</h1>
            <h2>Card List</h2>
            <span className="Card-items">
                <PaginationItems 
                    cardJump={cardJump} 
                    onClick={onClick} 
                    forwardClick={forwardClick} 
                    backwardClick={backwardClick} 
                    skipForwardClick={skipForwardClick} 
                    skipBackwardClick={skipBackwardClick} 
                    currentNum={activeNum} pageNum={pageNum} activeNum={activeNum}/>
                <DBTable header={testRow} data={page[activeNum]} />
                <PaginationItems 
                    cardJump={cardJump} 
                    onClick={onClick} 
                    forwardClick={forwardClick} 
                    backwardClick={backwardClick} 
                    skipForwardClick={skipForwardClick} 
                    skipBackwardClick={skipBackwardClick} 
                    currentNum={activeNum} pageNum={pageNum} activeNum={activeNum}/>
            </span>
        </div>
    )
}

export default CardListPage;