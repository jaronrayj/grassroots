$(document).ready(function() {
  
  $(document).on("submit", ".create-user", function(e) {
    e.preventDefault();
    
    var username = $("#username")
      .val()
      .trim();

    if (username.length < 6) {
      $("#username-validate").text(
        "Please have at least 6 characters in length"
      );
    }
  
    var email = $("#email")
      .val()
      .trim();
    var pwd = $("#pwd")
      .val()
      .trim();
    if (pwd.length < 6) {
      $("#password-validate").text(
        "Please have at least 6 characters in length"
      );
    }
    var pwdCheck = $("#pwd2")
      .val()
      .trim();

    if (pwd !== pwdCheck) {
      $("#password2-validate").text(
        `These passwords do not match`
      );
    } else {
      var newUser = {
        user_name: username,
        password: pwd,
        email: email
      };

      console.log(newUser);

      

      $.post("/api/users", newUser, function(data, status) {
        // alert("Data: " + data + "\nStatus: " + status);
        console.log(status);
        location.replace("/projects");
      });

      // FIREBASE SIGN UP NEW USER
      firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR CODE " + errorCode + ": " + errorMessage);
      });
    }

  });
  // $(document).on("submit", ".login", loginUser);

  // FIREBASE LOGIN EXISTING USER
  firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("ERROR CODE " + errorCode + ": " + errorMessage);
  });

  // AUTHENTICATION STATE OBSERVER
  firebase.auth().onAuthStateChanged(function(user) {
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
  $("#logout").on("click", function(e) {
    e.stopPropagation();

    auth.signOut().then(function() {
      console.log("logged out");
    }).catch(function(error) {
      console.log(error);
    });
  });

});