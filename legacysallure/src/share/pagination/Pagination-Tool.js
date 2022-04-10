import React from 'react';
import { Pagination } from 'react-bootstrap';
import shortid from 'shortid';
import './Pagination-Tool.css';

const Item = ({onClick, num, isActive}) => (
    <Pagination.Item onClick={() => (onClick(num))}  active={isActive}>
        {num}
    </Pagination.Item>
)

function ChooseActiveItem(onClick, activeNum, x) {
    if(activeNum === x) {
      return <Item key={shortid.generate()} onClick={onClick} num={x} isActive={true}/>
    }
    return <Item key={shortid.generate()} onClick={onClick} num={x} isActive={false}/>
}
const PaginationItems = ({cardJump, onClick, currentNum, pageNum, activeNum, forwardClick, backwardClick, skipForwardClick, skipBackwardClick,}) => {
    let paginationMax = currentNum + 2;
    let paginationMin = currentNum -2;
    let touchedEnd = false;
    let touchedBeginning = false;
    if (pageNum >= 11) {
        if (paginationMin < 3) paginationMax = currentNum + 6;
        if (paginationMax > pageNum-3) paginationMin = currentNum - 6;
    } 
    if (paginationMin === 1) touchedBeginning = true;
    if (paginationMax === pageNum) touchedEnd = true;
    if (paginationMin < 1) {
        paginationMin = 1;
        touchedBeginning = true;
    } else if (paginationMax > pageNum) {
        paginationMax = pageNum;
        touchedEnd = true;
    }
    let paginationItem = [];
    for(var x=paginationMin;x<=paginationMax;x++) {
        paginationItem.push(ChooseActiveItem(onClick, activeNum, x))
    }
    return (
        
        <div className="Page-turner">
            <Pagination size="sm" >
                <Pagination.First onClick={skipBackwardClick} disabled={(currentNum-cardJump) < 1}/>
                <Pagination.Prev onClick={backwardClick}  disabled={(currentNum-1) < 1}/>
                {
                    (!touchedBeginning) && (
                        <Item key={shortid.generate()} onClick={onClick} num={1} isActive={false}/>
                    )
                }
                {
                    (!touchedBeginning && paginationMin > 2) && (
                        <Pagination.Ellipsis disabled={true} />
                    )
                }
                {paginationItem} 
                {
                    (!touchedEnd && paginationMax < pageNum-1) && (
                        <Pagination.Ellipsis disabled={true} />
                    )
                }
                {
                    (!touchedEnd) && (
                        <Item key={shortid.generate()} onClick={onClick} num={pageNum} isActive={false}/>
                    )
                }
                <Pagination.Next onClick={forwardClick} disabled={(currentNum+1) > pageNum}/>
                <Pagination.Last onClick={skipForwardClick} disabled={(currentNum+cardJump) > pageNum}/>
            </Pagination>
        </div>
    )
}
export default PaginationItems;