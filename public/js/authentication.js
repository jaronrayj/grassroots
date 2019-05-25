var firebaseConfig = {
  apiKey: "AIzaSyA3QqXtwRNUb8tal061GneEXmCg5ySkQgM",
  authDomain: "grassroots-bbacc.firebaseapp.com",
  databaseURL: "https://grassroots-bbacc.firebaseio.com",
  projectId: "grassroots-bbacc",
  storageBucket: "grassroots-bbacc.appspot.com",
  messagingSenderId: "174098270905",
  appId: "1:174098270905:web:47388a2a647a4f3e"
};
firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
// auth.onAuthStateChanged(firebaseUser => {});

$("#sign-up").on("click", function(e) {
  e.preventDefault();

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function(credentials) {
      auth.currentUser.updateProfile({
        displayName: username
      });

      console.log(credentials);
    });
});

$("#login-btn").on("click", function(e) {
  e.preventDefault();
  console.log("logged in");

  // user info from inputs
  var email = $("#email")
    .val()
    .trim();
  var password = $("#pass")
    .val()
    .trim();

  // user login
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function(credentials) {
      console.log(credentials);
    })
    .catch(function(error) {
      console.log(error);
    });

  $("#email, #pass").val("");
});

$("#logout").on("click", function(e) {
  e.stopPropagation();

  auth
    .signOut()
    .then(function() {
      console.log("logged out");
    })
    .catch(function(error) {
      console.log(error);
    });
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
  }
});
