import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const app = firebase.initializeApp({
  apiKey: "AIzaSyB_gJ8Yg9Q7LOzXRJow99P_rNOqjCpy-Lo",
    authDomain: "mydrive-72b5a.firebaseapp.com",
    projectId: "mydrive-72b5a",
    storageBucket: "mydrive-72b5a.appspot.com",
    messagingSenderId: "305789288475",
    appId: "1:305789288475:web:94a630819be25be5a1b8be",
    measurementId: "G-W8BBMMLV4J"
})

const firestore = app.firestore()
export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}
export const storage = app.storage()
export const auth = app.auth()
export default app
