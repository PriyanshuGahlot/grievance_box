import * as helper from "./helper.js"

const grievanceInput = document.getElementById("grievanceInput")
const postBtn = document.getElementById("postBtn")
const moodSlider = document.getElementById("mood");
const userName = helper.getCookieValue("userName")
const micBtn = document.getElementById("micBtn")
const playback = document.getElementById("playback")
const categoryInput = document.getElementById("categories")

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
    if(!isRec) micBtn.textContent = "Stop Recording"
    else micBtn.textContent = "Start Recording"
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

postBtn.onclick = () => {
    const grievance = grievanceInput.value;
    const moodVal = moodSlider.value;
    const category = categoryInput.value;

    if (grievance !== "" || blob != null) {
        if (blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result; // e.g. "data:audio/ogg;base64,..."
                console.log(base64);
                helper.addGrievance(
                    userName,
                    helper.createGrievanceObj(grievance, moodVal, base64, category)
                );
                console.log(base64.length)
                blob = null;
            };
            reader.readAsDataURL(blob);
        } else {
            helper.addGrievance(
                userName,
                helper.createGrievanceObj(grievance, moodVal, null, category)
            );
        }
    }
    grievanceInput.value = ""
    const responses = [
    "Venting session complete—consider it officially documented!",
    "Complaint registered! We’ll send him a subtle hint... or a billboard.",
    "Girl, you just dropped some truth! We love it!",
    "That’s one way to keep him on his toes!",
    "Another day, another boyfriend oopsie. Classic!",
    "We feel the vibes. Boyfriends worldwide better step it up!",
    "Complaint received! No guarantees on him actually listening, though.",
    "That sounds like a whole situation... Stay strong!",
    "Spill the tea, queen! We’re all ears.",
    "Noted! Do we need to form a support group for this?",
    "Girlfriend complaint logged! We’ll let the universe deal with him.",
    "Your words have been heard—loud and clear!",
    "It’s okay, he probably didn’t even realize... typical.",
    "Consider it officially on the record! Stay iconic."
    ];

    alert(responses[Math.floor(Math.random() * responses.length)])

};

// moodSlider.oninput = ()=>{
//     moodSlider.style.accentColor = helper.getColor(moodSlider.value)
// }

for(let i = 0;i<=100;i++){
    console.log(helper.getColor(i))
}