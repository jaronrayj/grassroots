$(document).ready(function () {

  // JQuery Field ID's
  $(document).on("submit", ".login", loginUser);

  $(document).on("submit", "#user-form", initUser);
  

  function initUser(e) {
    e.preventDefault();

    let $pwd = $("#pwd").val().trim();
    let $pwd2 = $("#pwd2").val().trim();

    if ($pwd !== $pwd2) {
      alert("Those passwords do not match");
    } else {
      createUser();
    }

  };

  function createUser() {

    let newUser = {
      user_name: $("#username").val().trim(),
      password: $("#pwd").val().trim(),
      email: $("#email").val().trim()
    };

    $.post("/api/users", newUser).then(
    function(data){
      console.log(data);
      if (data){
        window.location.replace("/projects");
      } else {
        alert("Sorry, username is taken, please try another")
      }
    });


  };

});