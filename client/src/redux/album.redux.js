/**
 * Created by haita on 2018/1/14 0014.
 */
import axios from 'axios';
import { API } from '../const/host'
const GET_ALBUM_DETAIL = 'GET_ALBUM_DETAIL';
const initialState = {
    album:[],
    detail:""
}
export function album( state = initialState,action ) {

    switch (action.type){
        case GET_ALBUM_DETAIL:

            return { ...state,detail:action.payload };
        default:
            return state;
    }
}

function getAlbumDetailAction(data) {
    return {
        type:GET_ALBUM_DETAIL,
        payload:data
    }
}

export function getAlbumDetail(id) {
    return dispatch=>{
        axios.get(`${API}/mock/albumDetail/detail${id}.json`).then(res=>{
            let data = res.data;
            if(data.result){

                dispatch(getAlbumDetailAction(data.data))
            }
        })
    }
}