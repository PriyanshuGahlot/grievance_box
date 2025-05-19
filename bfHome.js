import * as helper from "./helper.js"

const list = document.getElementById("grievanceList");

function addGrievanceItem(audioBlob, content, mood, category,date, time) {
    const li = document.createElement("li");

    const moodDiv = document.createElement("div");
    moodDiv.id = "moodVal";
    moodDiv.textContent = mood;
    moodDiv.style.color = helper.getColor(mood)
    moodDiv.classList.add("mood");

    const contentDiv = document.createElement("div");
    contentDiv.id = "content";
    contentDiv.textContent = content;

    const categoryDiv = document.createElement("div");
    categoryDiv.id = "category";
    categoryDiv.textContent = category;

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = audioBlob;

    const dateDiv = document.createElement("div");
    dateDiv.id = "date";
    dateDiv.textContent = date;

    const timeDiv = document.createElement("div");
    timeDiv.id = "time";
    timeDiv.textContent = time;

    const d1 = document.createElement("div");
    d1.appendChild(categoryDiv)
    const d2 = document.createElement("div");
    d2.appendChild(dateDiv)
    d2.appendChild(timeDiv)
    d1.appendChild(d2)
    d1.appendChild(audio)

    categoryDiv.classList.add("categoryDiv")
    contentDiv.classList.add("contentDiv")
    audio.classList.add("audio")
    dateDiv.classList.add("dateDiv")
    timeDiv.classList.add("timeDiv")

    li.appendChild(moodDiv)
    li.appendChild(d1)
    li.appendChild(contentDiv)

    list.appendChild(li);
}

const gfName = helper.getCookieValue("userName")
let score = 0

helper.getGrievances(gfName).then(l => {
    l.reverse().forEach(grev => {
        addGrievanceItem(grev.audioBlob,grev.grievance,grev.mood,grev.category,grev.date,grev.time)
        score+=Number(grev.mood)
    });
    score = Math.floor(score/l.length)
    const finalScore = document.getElementById("finalScore")
    finalScore.textContent = score.toString()
    finalScore.style.color = helper.getColor(score)
})