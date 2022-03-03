import React from 'react';
import {Routes} from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import shortid from 'shortid';
import PageList from './constants/pageList';


function RouterSetup ({navigationList}) {
    const navy = navigationList.map(
        entry => <Route key={shortid.generate()} path={`/${entry['path']}`} element={PageList[entry['component']]}/>
    )
   return (
    <BrowserRouter>
        <Routes>
            {navy}
            <Route path="*" element={PageList.notFound}/>            
        </Routes>
    </BrowserRouter>
    )
}

export default RouterSetup