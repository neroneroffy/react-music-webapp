/**
 * Created by haita on 2018/1/15 0015.
 */
import axios from 'axios';
import { Toast } from 'antd-mobile'
const GET_SUMMARY = "GET_SUMMARY";
const GET_SONGS = "GET_SONGS";
const GET_SONG_LIST = "GET_SONG_LIST";
const MARK_SONGS = "MARK_SONGS";
const DEL_SONGS = "DEL_SONGS";
const BEGIN_PLAY = "BEGIN_PLAY";
const STOP_PLAY = "STOP_PLAY";
const initialState = {
    summary:"",
    songList:"",
    collectSongList:"",
    play:false
};

export function personal( state=initialState,action ) {
    switch (action.type){
        case GET_SUMMARY:
            return { ...state,summary:action.payload };
        case GET_SONGS:
            return { ...state,songList:action.payload };
        case GET_SONG_LIST:
            return { ...state,collectSongList:action.payload };
        case MARK_SONGS:
            return { ...state,songList:action.payload };
        case DEL_SONGS:
            return { ...state,songList:action.payload };
        case BEGIN_PLAY:
            return { ...state,play:true };
        case STOP_PLAY:
            return { ...state,play:false };
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
function getSongsAction(data) {
    return {
        type:GET_SONGS,
        payload:data
    }
}
function getSongListAction(data) {
    return {
        type:GET_SONG_LIST,
        payload:data
    }
}
function markSongsAction(data){
    return {
        type:MARK_SONGS,
        payload:data
    }
}
function delSongsAction(data){
    console.log(data)
    return {
        type:DEL_SONGS,
        payload:data
    }
}
//获取基本信息
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
//获取收藏的歌曲列表
export function getSongs(id) {
    return dispatch=>{
        axios.get(`/mock/personal${id}/collectSongs.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getSongsAction(data.data))
            }
        })
    }
}
//获取收藏的歌单
export function getCollectSongList(id) {
    return dispatch=>{
        axios.get(`/mock/personal${id}/collectSongList.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getSongListAction(data.data))
            }
        })
    }
}
//选择歌曲时候给选中歌曲添加标记
export function markSongs(id,all) {
    return (dispatch,getState)=>{
        let songList = getState().personal.songList;
        songList.forEach(v=>{
            if(!id && all){
               v.marked = true
            }else if(!id && !all){
                v.marked = false
            } else{
                if(v.id === id){
                    if(!v.marked){

                        v.marked = true
                    }else{
                        v.marked = false
                    }
                }
            }
        });
        dispatch(markSongsAction(songList))
    }
}
export function delSongs() {
    let canDel = true
    return (dispatch,getState)=>{
        let currentSong = getState().music.currentSong;
        let markedSongs = getState().personal.songList.filter(v => v.marked);
        markedSongs.forEach(v=>{

            if(currentSong.src === v.src){
                Toast.fail('要移除的歌曲中有正在播放的，不可移除', 1);
                canDel = false
            }
        })
        if(canDel){
            //只保留marked为true的项
            dispatch(delSongsAction( getState().personal.songList.filter(v => !v.marked)))

        }
    }
}
export function beginPlay() {
    return {
        type:BEGIN_PLAY
    }
}
export function stopPlay() {
    return {
        type:STOP_PLAY
    }
}
