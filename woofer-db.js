// Initialize Firebase
var config = {
  apiKey: "AIzaSyBH0WBIAdNh-12S-H6zSu31TivGwaWbl0I",
  authDomain: "anonoymous-messaging-app.firebaseapp.com",
  databaseURL: "https://anonoymous-messaging-app.firebaseio.com",
  projectId: "anonoymous-messaging-app",
  storageBucket: "anonoymous-messaging-app.appspot.com",
  messagingSenderId: "1007677670774"
}
firebase.initializeApp(config)
firebase.auth().signInAnonymously()
var createdDate = new Date().getTime()
// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  var newWoof = document.getElementById("woof-text").value
  firebase.database().ref("woofs").push({
    created_at: createdDate,
    text: newWoof
  })
// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page.
function readWoofsInDatabase () {
  firebase.database().ref('woofs')
    .on('child_added', function (addedSnap) {
      addWoofRow(addedSnap.key, addedSnap.val())
      addWoofRow(addedSnap.created_at)
      addWoofRow(addedSnap.text)
    })
  firebase.database().ref("woofs")
    .on('child_changed', function (updatedSnap) {
      updateWoofRow(updatedSnap.key, updatedSnap.val())
      updateWoofRow(updatedSnap.created_at)
      updateWoofRow(updatedSnap.text)
    })
  firebase.database().ref("woofs")
    .on('child_removed', function (deletedSnap) {
      deleteWoofRow(deletedSnap.key, deletedSnap.val())
      deleteWoofRow(deletedSnap.created_at)
      deleteWoofRow(deletedSnap.text)
    })
}

function updateWoofInDatabase (woofKey, woofText) {
  firebase.database().ref("woofs/" + woofKey).set({
    created_at: createdDate,
    text: woofText
  })
}

function deleteWoofFromDatabase (woofKey) {
  firebase.database().ref("woofs/" + woofKey).remove()
}}

// Load all of the data
createWoofsInDatabase()
