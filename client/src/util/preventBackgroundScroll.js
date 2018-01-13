/**
 * Created by haita on 2018/1/13 0013.
 */
export function fixedBody(){
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText += `position:fixed;top:-${scrollTop}px;width:100%;overflow:hidden`;
}
export function looseBody() {
    let body = document.body;
    body.style.position = '';
    let top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    document.body.style.cssText = ``;
    body.style.top = '';
}

