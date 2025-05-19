import {goto, hasCookie} from "./helper.js"

// if(hasCookie("userType")){
//     goto("home.html")
// }

const gfBtn = document.getElementById("gfBtn")
const bfBtn = document.getElementById("bfBtn")

function setUserType(type){
    document.cookie = `userType=${type}`
}

gfBtn.onclick = () =>{
    setUserType("gf")
    goto("setupPage.html")
}

bfBtn.onclick = () =>{
    setUserType("bf")
    goto("setupPage.html")
}