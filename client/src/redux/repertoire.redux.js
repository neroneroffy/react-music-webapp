/**
 * Created by haita on 2018/1/10 0010.
 */
import axios from 'axios';

const FETCH_BANNER = "FETCH_BANNER";
const FETCH_RECOMMEND = "FETCH_RECOMMEND";
const initialState = {
    bannerData:[],
    recommendData:[]
};
//reducer
export function repertoire(state=initialState,action) {
    switch (action.type){
        case FETCH_BANNER:
            return {...state,bannerData:action.payload};
        case FETCH_RECOMMEND:
            return {...state,recommendData:action.payload};
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
function recommendData(data) {
    return {
        payload:data,
        type:FETCH_RECOMMEND
    }
}

//用户调用的dispatch action的函数
//获取banner
export function fetchBanner() {
    return dispatch=>{
        axios.get('/mock/banner.json').then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(bannerdata(data.data))
            }
        })
    }
}

//获取每日推荐
export function fetchRecommend() {
    return dispatch=>{
        axios.get('/mock/recommend.json').then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(recommendData(data.data))
            }
        })
    }
}