import * as helper from "/helper.js"
const saveNameBtn = document.getElementById("setUserNameBtn")
const inputBox = document.getElementById("nameBox")

const userType = helper.getCookieValue("userType")

if(userType=="bf"){
    inputBox.placeholder  = "whats ur gfs name"
    saveNameBtn.textContent = "get rekt"
}else if(userType=="gf"){
    inputBox.placeholder  = "Whats ur pretty name girle"
}

saveNameBtn.onclick = () =>{
    if(inputBox.value!=""){
        document.cookie = `userName=${inputBox.value}`
        if(userType=="gf") helper.goto("home.html")
        else helper.goto("bfHome.html")
    }else{
        alert("Add a name")
    }
}
