$(document).ready(function () {

  // AUTHENTICATION STATE OBSERVER
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // var displayName = user.displayName;
      // var email = user.email;
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

  // FIREBASE LOGOUT STATE CHANGE
  $("#logout").on("click", function (e) {
    e.stopPropagation();

    auth.signOut().then(function () {
      console.log("logged out");
    }).catch(function (error) {
      console.log(error);
    });
  });

})