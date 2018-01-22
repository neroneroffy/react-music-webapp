/**
 * Created by haita on 2018/1/15 0015.
 */
import axios from 'axios';
const GET_SUMMARY = "GET_SUMMARY";
const GET_SONGS = "GET_SONGS";
const initialState = {
    summary:"",
    songList:""
};

export function personal( state=initialState,action ) {
    switch (action.type){
        case GET_SUMMARY:
            return { ...state,summary:action.payload };
        case GET_SONGS:
            return { ...state,songList:action.payload };
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
