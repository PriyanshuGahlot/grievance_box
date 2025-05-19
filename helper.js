import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, set, child, get} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://grievancebox-300ce-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const users = ref(database,"Users")

export function addGrievance(user, grievance) {
    const userRef = child(users, user)

    get(userRef).then(snapshot => {
        let itemRef
        if (snapshot.exists()) {
            const count = snapshot.size
            itemRef = child(userRef, count.toString())
        } else {
            itemRef = child(userRef, "0")
        }
        return set(itemRef, grievance)
    }).catch(error => {
        console.error(error)
    })
}

export async function getGrievances(user) {
    const userRef = child(users, user);
    const snapshot = await get(userRef);
    const l = [];
    if (snapshot.exists()) {
        snapshot.forEach(childSnap => {
            l.push(childSnap.val());
        });
    }
    return l;
}

export function goto(page){
    window.location.replace(page)
}

export function hasCookie(name) {
    return document.cookie.split(";").some(cookie => cookie.trim().startsWith(name + "="));
}

export function getCookieValue(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) return decodeURIComponent(value);
  }
  return null; // cookie not found
}

export function createGrievanceObj(grievance,mood,audioBlob,category){
    const now = new Date();
    const item = {
        grievance : grievance,
        mood : mood,
        audioBlob :audioBlob,
        category : category,
        date : now.toISOString().slice(0, 10),
        time : now.toLocaleTimeString()
    }
    return item
}

export function getColor(val){
    let red = 255
    let green = 255
    if(val<50){
        green = 255 * (val/50)
    }else if(val>50){
        red = 255 * ((100-val)/50)
    }
    return `rgb(${red}, ${green}, 0)`;
}

// addGrievance("u1",{c:1,b:2})
// getGrievances("u1").then(l => {
//     console.log(l)
// })


