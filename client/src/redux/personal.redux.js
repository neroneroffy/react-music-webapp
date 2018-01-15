/**
 * Created by haita on 2018/1/15 0015.
 */
import axios from 'axios';
const GET_SUMMARY = "GET_SUMMARY";
const initialState = {
    summary:""
};

export function personal( state=initialState,action ) {
    switch (action.type){
        case GET_SUMMARY:
            return { ...state,summary:action.payload };
        default:
            return state;
    }
}

function getSummaryAction(data) {
    return {
        type:GET_SUMMARY,
        payload:data
    }
}

export function getSummary(id) {
    return dispatch=>{
        axios.get(`/mock/personal${id}/summary.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getSummaryAction(data.data))
            }
        })
    }
}