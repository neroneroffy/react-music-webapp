/**
 * Created by haita on 2018/1/13 0013.
 */
import axios from 'axios';
import {API} from "../const/host";
const GET_SONGS_LIST_DETAIL = "GET_SONGS_LIST_DETAIL";
const initialState = {
    data:null
}
export function songsListDetail(state = initialState,action) {
    switch (action.type){
        case GET_SONGS_LIST_DETAIL:
            return {...state,data:action.payload};
        default:
            return state;
    }
}

function getSongsListDetailAction(data) {
    return {
        type:GET_SONGS_LIST_DETAIL,
        payload:data
    }
};
export function getSongsListDetail(id) {
    return dispatch=>{
        axios.get(`${API}/mock/songListDetail/detail${id}.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getSongsListDetailAction(data.data))
            }
        })
    }
}