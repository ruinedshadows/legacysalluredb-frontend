import { ActionTypes } from "../../constants/action-types/actionTypes";

const intialState = {
    data : {}
};

function cardInfoReducer(state = intialState, action) {
    switch (action.type){
        case ActionTypes.SAVECARDINFO:
            console.log(state)
            return Object.assign({}, state, { data: action.payload})
        default:
            return state;
    }
}

export default cardInfoReducer;