var firebaseConfig = {
  apiKey: "AIzaSyBKLtFrWo_77F4B2KegnKmhn9okAJNiqFY",
  authDomain: "nandini-comments.firebaseapp.com",
  databaseURL: "https://nandini-comments.firebaseio.com",
  projectId: "nandini-comments",
  storageBucket: "nandini-comments.appspot.com",
  messagingSenderId: "587109308986",
  appId: "1:587109308986:web:1821306efa1ad6ac84f303"
};
firebase.initializeApp(firebaseConfig);

const rootRef = firebase.database().ref();
const commentsRef = rootRef.child("comments");

document.getElementById("btnSubmitComment").addEventListener("click", function () {
    var newPostRef = commentsRef.push();
    newPostRef.set({
        name: document.getElementById("tbName").value.trim(),
        comment: document.getElementById("txComment").value.trim(),
        frompage: location.pathname,
        when: firebase.database.ServerValue.TIMESTAMP
    });
});

function showpastcomments() {
var showat = document.getElementById('pastcomments');
var commentsRef = firebase.database().ref('comments/').orderByChild('frompage').equalTo(location.pathname);
commentsRef.once('value', function (snapshot) {
    snapshot.forEach(function (itemSnapshot) {
        var itemData = itemSnapshot.val();
        var comment = itemData.comment;
        var name = itemData.name;
        var when = new Date(itemData.when).toLocaleDateString("en");
        showat.innerHTML += "<li>" + comment + "  <span> " + name + " (" + when +
            ")</span></li><hr>";
          })
      })
  }

showpastcomments()
