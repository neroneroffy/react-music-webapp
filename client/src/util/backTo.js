/**
 * Created by haita on 2018/1/15 0015.
 */
export function setRoute (path) {
    sessionStorage.setItem('route',path)
}
export function getRoute () {

    if(sessionStorage.getItem('route').indexOf("collectsonglistdetail")>0){
        return '/me'
    }else if(sessionStorage.getItem('route').indexOf("ranking")>0){
        return '/discover'
    }else if(sessionStorage.getItem('route').indexOf("style-songs-list-detail")>0){
        return '/discover'
    }
    return sessionStorage.getItem('route')
}