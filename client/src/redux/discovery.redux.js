import axios from 'axios';
import {API} from "../const/host";
const GET_DATA = "GET_DATA";
const GET_RANK_LIST = "GET_RANK_LIST";
const GET_RANK_DETAIL = "GET_RANK_DETAIL";
const CLEAR_DETAIL = "CLEAR_DETAIL";
const GET_STYLE_SONG_LIST = "GET_STYLE_SONG_LIST";
const initialState = {
    data:"",
    rankList:"",
    rankDetail:"",
    styleSongsList:""
};

export function discovery(state = initialState,action) {
    switch (action.type){
        case GET_DATA:
            return { ...state,data:action.payload };
        case GET_RANK_LIST:
            return { ...state,rankList:action.payload };
        case GET_RANK_DETAIL:
            return { ...state,rankDetail:action.payload };
        case CLEAR_DETAIL:
            return { ...state,rankDetail:"" };
        case GET_STYLE_SONG_LIST:
            return { ...state,styleSongsList:action.payload };
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

function celarDetail() {
    return {
        type:CLEAR_DETAIL
    }
}

function getStyleSongsListAction(data) {
    return {
        type:GET_STYLE_SONG_LIST,
        payload:data
    }
}
export function getDiscoveryData() {
    return dispatch=>{
        axios.get(`${API}/mock/discovery/discovery.json`).then(response=>{
            let res = response.data;
            if(res.result){
                dispatch(getDiscoveryDataAction(res.data))
            }
        })
    }
}

export function getRankList() {
    return dispatch=>{
        axios.get(`${API}/mock/discovery/ranking-list.json`).then(response=>{
            let res = response.data;
            if(res.result){
                dispatch(getRankListAction(res.data))
            }
        })
    }
}

export function getRankDetail(id) {
    return dispatch=>{
        dispatch(celarDetail());
        axios.get(`${API}/mock/discovery/ranking-detail${id}.json`).then(response=>{
            let res = response.data;
            if(res.result){
                dispatch(getRankDetailAction(res.data));
            }
        })
    }
}

export function getStyleSongsList(id) {
    return dispatch =>{
        axios.get(`${API}/mock/discovery/style/styleSongList${id}.json`).then(response=>{
            let res = response.data;
            if(res.result){
                dispatch(getStyleSongsListAction(res.data))
            }
        })
    }
}


