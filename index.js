import * as helper from "/helper.js"
const saveNameBtn = document.getElementById("setUserNameBtn")
const inputBox = document.getElementById("nameBox")

saveNameBtn.onclick = () =>{
    helper.setUser(inputBox.value)
}


