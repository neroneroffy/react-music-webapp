import axios from 'axios';
const GET_DATA = "GET_DATA";
const initialState = {
    data:""
};

export function discovery(state = initialState,action) {
    switch (action.type){
        case GET_DATA:
            return { ...state,data:action.payload };
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

export function getDiscoveryData() {
    return dispatch=>{
        axios.get(`/mock/discovery/discovery.json`).then(response=>{
            let res = response.data;
            if(res.result){
                dispatch(getDiscoveryDataAction(res.data))
            }
        })
    }
}

