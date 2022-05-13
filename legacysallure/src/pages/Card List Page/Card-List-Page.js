import React from 'react';
import PaginationItems from '../../share/pagination/Pagination-Tool';
import './Card-List-Page.css';
import DBTable from '../../share/table/DB-Table';
import { ConvertRowsToPages } from '../../shared-functions/ConvertRowsToPages';
import { cardColumnHeaders } from '../../constants/column-names/cardColumnHeaders.ts';
import { cardColumnNames } from '../../constants/general-strings/cardColumnNames';
import FilterSortMenu from '../../share/filter-and-sort-menu/Filter-Sort-Menu';

const CardListPage = () => {
    const cardNum = 2031;
    const cardsLimit = 20;
    const cardJump = Math.round((cardNum/cardsLimit)/6);
    const [activeNum, changeActiveNum] = React.useState(1);
    const [page, changePages] = React.useState({});
    const [pageNum, changePageNum] = React.useState(null);
    
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
    function updatePages(page, num) {
        changePages(page)
        changePageNum(num)
        changeActiveNum(1)
    }

    let deckData = [];
    for(var x = 1; x<=cardNum; x++) {
        deckData.push([x,"Test Name", x, 100, 2, 2, 10, 4, "Test Faction", "Test Type"])
    }
    return (
        <div className="Card-page">
            <h1>Legacy's Allure DB</h1>
            <h2>Card List</h2>
            <span className="Card-items">
                <FilterSortMenu deckData={deckData} filterChange={updatePages} cardNum={cardNum} cardsLimit={cardsLimit}/>
                 {Object.keys(page).length > 0 && (
                     <div>
                        <PaginationItems 
                            cardJump={cardJump} 
                            onClick={onClick} 
                            forwardClick={forwardClick} 
                            backwardClick={backwardClick} 
                            skipForwardClick={skipForwardClick} 
                            skipBackwardClick={skipBackwardClick} 
                            currentNum={activeNum} pageNum={pageNum} activeNum={activeNum}/>
                        <DBTable header={cardColumnNames} data={page[activeNum]} filter={["Name", "Gold"]} isLinked={true}/>
                        <PaginationItems 
                            cardJump={cardJump} 
                            onClick={onClick} 
                            forwardClick={forwardClick} 
                            backwardClick={backwardClick} 
                            skipForwardClick={skipForwardClick} 
                            skipBackwardClick={skipBackwardClick} 
                            currentNum={activeNum} pageNum={pageNum} activeNum={activeNum}/>
                     </div>
                    )}
            </span>
        </div>
    )
}

export default CardListPage;