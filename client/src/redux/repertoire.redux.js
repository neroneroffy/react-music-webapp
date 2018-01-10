/**
 * Created by haita on 2018/1/10 0010.
 */
import axios from 'axios';

const FETCH_BANNER = "FETCH_BANNER";
const initialState = {
    data:[]
};
//reducer
export function repertoire(state=initialState,action) {
    switch (action.type){
        case FETCH_BANNER:
            return {...state,data:action.payload};
        default:
            return state
    }
}
//actionCreator
function bannerdata(data) {
    return {
        payload:data,
        type:FETCH_BANNER
    }
}

//用户调用的dispatch action的函数
export function fetchBanner() {
    return dispatch=>{
        axios.get('/mock/banner.json').then(res=>{
            let data = res.data;
            dispatch(bannerdata(data.data))
        })
    }
}
