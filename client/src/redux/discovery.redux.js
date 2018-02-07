import axios from 'axios';
const GET_DATA = "GET_DATA";
const GET_RANK_LIST = "GET_RANK_LIST";
const initialState = {
    data:"",
    rankList:""
};

export function discovery(state = initialState,action) {
    switch (action.type){
        case GET_DATA:
            return { ...state,data:action.payload };
        case GET_RANK_LIST:
            return { ...state,rankList:action.payload };
        default:
            return state;
    }
}

function getDiscoveryDataAction(data) {
    return {
        type:GET_DATA,
        payload:data
    }
}
function getRankListAction(data) {
    return {
        type:GET_RANK_LIST,
        payload:data
    }
}

export function getDiscoveryData() {
    return dispatch=>{
        axios.get(`/mock/discovery/discovery.json`).then(response=>{
            let res = response.data;
            if(res.result){
                dispatch(getDiscoveryDataAction(res.data))
            }
        })
    }
}

export function getRankList() {
    return dispatch=>{
        axios.get(`/mock/discovery/ranking-list.json`).then(response=>{
            let res = response.data;
            if(res.result){
                dispatch(getRankListAction(res.data))
            }
        })
    }
}
