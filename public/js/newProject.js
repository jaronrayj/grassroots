$(document).ready(function() {
  $(document).on("submit", ".create-project", function(e) {
    e.preventDefault();

    var title = $("#title")
      .val()
      .trim();
    var description = $("#description")
      .val()
      .trim();
    var place = $("#location")
      .val()
      .trim();
    var rawDateTime = $("#date").val();
    var numberOfPeople = $("#number-of-people")
      .val()
      .trim();
    var category = $("#category").val();

    var splitRawDateTime = rawDateTime.split("T");

    var time = splitRawDateTime.pop();
    var date = splitRawDateTime[0];

    var newProject = {
      title: title,
      description: description,
      location: place,
      time: time,
      date: date,
      number_of_people: numberOfPeople,
      category_type: category
    };

    $.ajax({
      type: "post",
      url: "/api/projects",
      data: newProject
    }).then(function(data, status) {
      console.log(status);
      location.replace("/projects/my");
    });
  });
});

$(document).on("click", ".delete-project", function() {
  var id = $(this).data("id");

  var url = "/api/projects/" + id;

  $.ajax({
    type: "delete",
    url: url
  }).then(function(data) {
    alert("Project  " + data.name + " deleted");
    location.reload();
  });
});

// AUTHENTICATION STATE OBSERVER
// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     // User is signed in.
//     // var displayName = user.displayName;
//     // var email = user.email;
//     // var emailVerified = user.emailVerified;
//     // var photoURL = user.photoURL;
//     // var isAnonymous = user.isAnonymous;
//     // var uid = user.uid;
//     // var providerData = user.providerData;
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
// });

// // FIREBASE LOGOUT STATE CHANGE
// $("#logout").on("click", function (e) {
//   e.stopPropagation();

//   auth.signOut().then(function () {
//     console.log("logged out");
//   }).catch(function (error) {
//     console.log(error);
//   });
// });
