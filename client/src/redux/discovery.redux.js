import axios from 'axios';
const GET_DATA = "GET_DATA";
const GET_RANK_LIST = "GET_RANK_LIST";
const GET_RANK_DETAIL = "GET_RANK_DETAIL";
const GET_RANK_DETAIL_LIST = "GET_RANK_DETAIL_LIST";
const initialState = {
    data:"",
    rankList:"",
    rankDetail:"",
    rankDetailList:""
};

export function discovery(state = initialState,action) {
    switch (action.type){
        case GET_DATA:
            return { ...state,data:action.payload };
        case GET_RANK_LIST:
            return { ...state,rankList:action.payload };
        case GET_RANK_DETAIL:
            return { ...state,rankDetail:action.payload };
        case GET_RANK_DETAIL_LIST:
            return { ...state,rankDetailList:action.payload };
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
function getRankDetailAction(data) {
    return {
        type:GET_RANK_DETAIL,
        payload:data
    }
}
function getRankDetailListAction(data) {
    return {
        type:GET_RANK_DETAIL_LIST,
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

export function getRankDetail(id) {
    return dispatch=>{
        axios.get(`/mock/discovery/ranking-detail${id}.json`).then(response=>{
            let res = response.data;
            if(res.result){
                dispatch(getRankDetailAction(res.data));
                axios.get(`/mock/discovery/ranking-detail${id}list1.json`).then(response=>{
                    let res = response.data;
                    if(res.result){
                        dispatch(getRankDetailListAction(res.data))
                    }
                })
            }
        })
    }
}
export function getRankDetailList(id,num) {
    return dispatch=>{
        axios.get(`/mock/discovery//ranking-detail${id}list${num}.json`).then(response=>{
            let res = response.data;
            if(res.result){
                dispatch(getRankDetailListAction(res.data))
            }
        })
    }
}
