/**
 * Created by haita on 2018/1/14 0014.
 */
import axios from 'axios';
import {API} from "../const/host";
const GET_COMMENT = "GET_COMMENT";
const CLEAR_COMMENT = "CLEAR_COMMENT";
const NO_COMMENT = "NO_COMMENT";
const NO_MORE_COMMENT = "NO_MORE_COMMENT";
const initialState = {
    comment:[],
    msg:"",
    hasRequested:false
};
export function comment(state = initialState,action) {
    switch (action.type){
        case GET_COMMENT:
            return { ...state,comment:action.payload,hasRequested:true };
        case CLEAR_COMMENT:
            return { ...state,comment:[],hasRequested:false };
        case NO_COMMENT:
            return { ...state,comment:[],msg:"暂无评论" };
        case NO_MORE_COMMENT:
            return { ...state,...comment,msg:"这里是底线" };
        default:
            return state;
    }
}

function getCommentAction(data) {
    return {
        type:GET_COMMENT,
        payload:data
    }
}

function clearCommentAction() {
    return {
        type:CLEAR_COMMENT
    }
}
function noCommentAction() {
    return {
        type:NO_COMMENT,
        payload:"暂无评论"
    }
}
function noMoreCommentAction() {
    return {
        type:NO_MORE_COMMENT,
        payload:"这里是底线"
    }
}

export function getComment (id,pageNum) {
    return dispatch=>{
        axios.get(`${API}/mock/albumDetail/comment${id}/content${pageNum}.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getCommentAction(data.data))
            }else if(!data.result && !data.msg){
                dispatch(noCommentAction())
            }else if(!data.result && data.msg){
                dispatch(noMoreCommentAction())
            }
        })
    }
}
export function clearComment() {
    return dispatch=>{
        dispatch(clearCommentAction())
    }
}

