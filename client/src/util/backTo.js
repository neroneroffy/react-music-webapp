/**
 * Created by haita on 2018/1/15 0015.
 */
import {HOST} from '../const/host'
export function setRoute (path) {
    sessionStorage.setItem('route',path)
}
export function getRoute () {

    if(sessionStorage.getItem('route').indexOf("collectsonglistdetail")>0){
        return `${HOST}/me`
    }else if(sessionStorage.getItem('route').indexOf("ranking")>0){
        return `${HOST}/discover`
    }else if(sessionStorage.getItem('route').indexOf("style-songs-list-detail")>0){
        return `${HOST}/discover`
    }
    return sessionStorage.getItem('route')
}