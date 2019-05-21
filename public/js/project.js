$(document).ready(function() {

  $(document).on("submit", ".create-user", function(e) {
    e.preventDefault();

    $(document).on("submit", ".create-project" function () {
      
      var title = $("#title").val().trim();
      var description = $("#description").val().trim();
      var location = $("#location").val().trim();
      var time = $("#time").val().trim();
      var date = $("#date").val().trim();
      var numberOfPeople = $("#number-of-people").val().trim();
      var category = $("#category").val().trim();

      let newProject = {
        title: title,
        description: description,
        location: location,
        time: time,
        date: date,
        number_pf_people: numberOfPeople,
        category_type: category
      }

      $.post("/api/projects", newProject, function(data, status){
        console.log(status);
        if (status){
          alert(`Project ${title} is created!`)
        }
      })

    });
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