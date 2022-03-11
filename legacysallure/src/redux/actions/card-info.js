import { ActionTypes } from "../../constants/action-types/actionTypes"

function SaveCardInfo(data) {
    return {
        type: ActionTypes.SAVECARDINFO,
        payload:data
    }
}


export const CRUDCardActions = {
    SaveCardInfo
}
