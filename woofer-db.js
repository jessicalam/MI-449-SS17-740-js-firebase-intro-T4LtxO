// TODO Sign into the database anonymously
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBH0WBIAdNh-12S-H6zSu31TivGwaWbl0I',
  authDomain: 'anonoymous-messaging-app.firebaseapp.com',
  databaseURL: 'https://anonoymous-messaging-app.firebaseio.com',
  projectId: 'anonoymous-messaging-app',
  storageBucket: 'anonoymous-messaging-app.appspot.com',
  messagingSenderId: '1007677670774'
}
firebase.initializeApp(config)
firebase.auth().signInAnonymously()
var curDate = new Date().getTime()
// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  var newWoof = document.getElementById('woof-text').value
  firebase.database().ref('woofs').push({
    created_at: curDate,
    text: newWoof
  })
// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page.
/function readWoofsInDatabase () {
  firebase.database().ref('woofs')
    .on('child_added', function (addSnap) {
      addWoofRow(addSnap.key, addSnap.val())
      addWoofRow(addSnap.created_at)
      addWoofRow(addSnap.text)
    })
  firebase.database().ref('woofs')
    .on('child_changed', function (updateSnap) {
      updateWoofRow(updateSnap.key, updateSnap.val())
      updateWoofRow(updateSnap.created_at)
      updateWoofRow(updateSnap.text)
    })
  firebase.database().ref('woofs')
    .on('child_removed', function (deleteSnap) {
      deleteWoofRow(deleteSnap.key, deleteSnap.val())
      deleteWoofRow(deleteSnap.created_at)
      deleteWoofRow(deleteSnap.text)
    })
}

function updateWoofInDatabase (woofKey, woofText) {
  firebase.database().ref('woofs/' + woofKey).set({
    created_at: curDate,
    text: woofText
  })
}

function deleteWoofFromDatabase (woofKey) {
  firebase.database().ref('woofs/' + woofKey).remove()
}
// Load all of the data
readWoofsInDatabase ()
