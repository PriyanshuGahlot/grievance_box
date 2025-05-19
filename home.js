import * as helper from "./helper.js"

const grievanceInput = document.getElementById("grievanceInput")
const postBtn = document.getElementById("postBtn")
const moodSlider = document.getElementById("mood");
const userName = helper.getCookieValue("userName")
const micBtn = document.getElementById("micBtn")
const playback = document.getElementById("playback")

let canRec = false
let isRec = false
let recorder = null
let chunks = []
let blob = null

function setupAudio(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({ audio:true})
        .then(SetupStream)
        .catch(err => {console.log(err)})
    }
}

setupAudio()

function SetupStream(stream){
    recorder = new MediaRecorder(stream)
    recorder.ondataavailable = e =>{
        chunks.push(e.data)
    }
    recorder.onstop = e=>{
        blob = new Blob(chunks,{type:"audio/ogg; codecs=opus"})
        chunks = []
        const audioUrl = window.URL.createObjectURL(blob)
        playback.src = audioUrl
    }
    canRec = true
}

function toggleMic(){
    if(!canRec) return
    isRec = !isRec
    if(isRec){
        recorder.start()
    }else{
        recorder.stop()
    }
}

micBtn.onclick= ()=>{
    toggleMic()
}

// postBtn.onclick = ()=>{
//     const grievance = grievanceInput.value
//     const moodVal = moodSlider.value

//     const reader = new FileReader();
//     reader.onloadend = () => {
//         const base64 = reader.result; // This is a data URL (e.g., "data:audio/ogg;base64,...")
//         console.log(base64);
//     };
//     // reader.readAsDataURL(blob);




//     console.log(blob)
//     helper.addGrievance(userName,helper.createGrievanceObj(grievance,moodVal,reader.readAsDataURL(blob)))
//     blob = null
// }

postBtn.onclick = () => {
    const grievance = grievanceInput.value;
    const moodVal = moodSlider.value;

    if (grievance !== "" || blob != null) {
        if (blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result; // e.g. "data:audio/ogg;base64,..."
                console.log(base64);
                helper.addGrievance(
                    userName,
                    helper.createGrievanceObj(grievance, moodVal, base64)
                );
                console.log(base64.length)
                blob = null;
            };
            reader.readAsDataURL(blob);
        } else {
            helper.addGrievance(
                userName,
                helper.createGrievanceObj(grievance, moodVal, null)
            );
        }
    }
};
