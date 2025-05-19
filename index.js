import {goto, hasCookie, getCookieValue} from "./helper.js"

if(hasCookie("userType")){
    if(getCookieValue("userType")=="gf") goto("home.html")
    else if(getCookieValue("userType")=="bf") goto("bfHome.html")
}

const gfBtn = document.getElementById("gfBtn")
const bfBtn = document.getElementById("bfBtn")

function setUserType(type){
    document.cookie = `userType=${type}`
}

gfBtn.onmouseup = () =>{
    setUserType("gf")
    goto("setupPage.html")
}

bfBtn.onmouseup = () =>{
    setUserType("bf")
    goto("setupPage.html")
}