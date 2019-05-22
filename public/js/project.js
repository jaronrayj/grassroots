$(document).ready(function () {


  $(document).on("submit", ".create-project", function (e) {
    e.preventDefault();

    var title = $("#title").val().trim();
    console.log("TCL: title", title);
    var description = $("#description").val().trim();
    console.log("TCL: description", description);
    var location = $("#location").val().trim();
    console.log("TCL: location", location);
    var date = $("#date").val();
    console.log("TCL: date", date);
    var numberOfPeople = $("#number-of-people").val().trim();
    console.log("TCL: numberOfPeople", numberOfPeople);
    var category = $("#category").val();
    console.log("TCL: category", category);

    let newProject = {
      title: title,
      description: description,
      location: location,
      time: time,
      date: date,
      number_pf_people: numberOfPeople,
      category_type: category
    }

    $.post("/api/projects", newProject, function (data, status) {
      console.log(status);
      if (status) {
        alert(`Project ${title} is created!`)
      }
    })

  });
});


$(document).on("click", ".delete-project", function () {
  let id = $(this).data("id");

  let url = `/api/projects/${id}`

  $.ajax({
    type: "delete",
    url: url
  }).then(function (data) {
    alert(`Project ${data.name} deleted`);
    location.reload();
  })

});

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