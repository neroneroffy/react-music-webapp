/**
 * Created by haita on 2018/1/15 0015.
 */
export function setRoute (path) {
    sessionStorage.setItem('route',path)
}
export function getRoute () {

    if(sessionStorage.getItem('route').indexOf("collectsonglistdetail")>0){
        return '/me'
    }
    return sessionStorage.getItem('route')
}