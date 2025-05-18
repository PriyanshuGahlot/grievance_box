import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, set, child, get} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://grievancebox-300ce-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
let userName = null
const app = initializeApp(appSettings)
const database = getDatabase(app)
const users = ref(database,"Users")

export function setUser(name) {
    userName = name;
}

export function getUser() {
    return userName;
}

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



// addGrievance("u1",{c:1,b:2})
// getGrievances("u1").then(l => {
//     console.log(l)
// })


