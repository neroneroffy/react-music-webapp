import axios from 'axios';
import { Toast } from 'antd-mobile';
const GET_SONGS = "GET_SONGS";
const MARK_SONGS = "MARK_SONGS";
const DEL_SONGS = "DEL_SONGS";
const BEGIN_PLAY = "BEGIN_PLAY";
const STOP_PLAY = "STOP_PLAY";
const CLEAR_SONGS = "CLEAR_SONGS";
const initialState = {
    songs:"",
    play:false
};

export function publicSongs( state=initialState,action ) {
    switch (action.type){
        case GET_SONGS:
            return { ...state,songs:action.payload };
        case MARK_SONGS:
            return { ...state,songs:action.payload };
        case DEL_SONGS:
            return { ...state,songs:action.payload };
        case CLEAR_SONGS:
            return { ...state,songs:"" };
        case BEGIN_PLAY:
            return { ...state,play:true };
        case STOP_PLAY:
            return { ...state,play:false };
        default:
            return state;
    }
}

function getSongsAction(data) {
    return {
        type:GET_SONGS,
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
    return {
        type:DEL_SONGS,
        payload:data
    }
}
function clearSongs() {
    return {
        type:CLEAR_SONGS
    }
}

//获取歌曲列表
export function getSongs(url) {
    return dispatch=>{
        dispatch(clearSongs())
        axios.get(url).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getSongsAction(data.data))
            }
        })
    }
}

//选择歌曲时候给选中歌曲添加标记
export function markSongs(id,all) {
    return (dispatch,getState)=>{
        let songList = getState().publicSongs.songs;
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
        let markedSongs = getState().publicSongs.songs.filter(v => v.marked);
        markedSongs.forEach(v=>{

            if(currentSong.src === v.src){
                Toast.fail('要移除的歌曲中有正在播放的，不可移除', 1);
                canDel = false
            }
        })
        if(canDel){
            //只保留marked为true的项
            dispatch(delSongsAction( getState().publicSongs.songs.filter(v => !v.marked)))

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
