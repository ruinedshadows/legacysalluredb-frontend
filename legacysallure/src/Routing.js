import React from 'react';
import {Routes} from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import shortid from 'shortid';
import PageList from './constants/pageList';


const RouterSetup = ({navigationList, detailedNaviList}) => (
    <BrowserRouter>
        <Routes>
            {
                navigationList.map(
                    entry => <Route key={shortid.generate()} 
                                path={`${entry['path']}`} 
                                element={PageList[entry['component']]}/>
                )
            }
            {
                detailedNaviList.map(
                    entry => 
                    <Route 
                        path={`${entry['path']}`} 
                        key={shortid.generate()}>
                        <Route 
                            path="info:id" 
                            element={PageList[entry['component']]} />
                    </Route>
                )
            }
            <Route path="*" element={PageList.notFound}/>            
        </Routes>
    </BrowserRouter>
)

export default RouterSetup