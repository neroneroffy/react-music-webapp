/**
 * Created by haita on 2018/1/15 0015.
 */
import axios from 'axios';
import { HOST } from '../const/host'
import {API} from "../const/host";
const GET_SUMMARY = "GET_SUMMARY";
const GET_SONGS = "GET_SONGS";
const GET_SONG_LIST = "GET_SONG_LIST";
const MARK_SONGS = "MARK_SONGS";
const DEL_SONGS = "DEL_SONGS";
const BEGIN_PLAY = "BEGIN_PLAY";
const STOP_PLAY = "STOP_PLAY";
const DEL_SONG_LIST = "DEL_SONG_LIST";
const initialState = {
    summary:"",
    collectSongList:""
};

export function personal( state=initialState,action ) {
    switch (action.type){
        case GET_SUMMARY:
            return { ...state,summary:action.payload };
        case GET_SONG_LIST:
            return { ...state,collectSongList:action.payload };
        case DEL_SONG_LIST:
            return { ...state,collectSongList:action.payload };
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

function getSongListAction(data) {
    return {
        type:GET_SONG_LIST,
        payload:data
    }
}

function delSongListAction(data){
    return {
        type:DEL_SONG_LIST,
        payload:data
    }
}
//获取基本信息
export function getSummary(id) {
    return dispatch=>{
        axios.get(`${API}/mock/personal${id}/summary.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getSummaryAction(data.data))
            }
        })
    }
}

//获取收藏的歌单
export function getCollectSongList(id) {
    return dispatch=>{
        axios.get(`${API}/mock/personal${id}/collectSongList.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getSongListAction(data.data))
            }
        })
    }
}
//删除歌单
export function delCollectSongList(id,userId) {
    return (dispatch,getState)=>{
        let currentList = window.location.pathname === `${HOST}/me`?getState().personal.summary.mySongList : getState().personal.collectSongList;
        console.log(currentList);
        let delIndex = currentList.findIndex((value,index,arr)=>{

            return value.id ===id
        });
        console.log(delIndex)
        currentList.splice(delIndex,1)
        console.log(currentList)
        dispatch(delSongListAction(currentList))
    }
}

