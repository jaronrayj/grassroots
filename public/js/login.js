$(document).ready(function () {

  // JQuery Field ID's

  $(document).on("submit", ".create-user", initUser);
  $(document).on("submit", ".login", loginUser);

  function initUser() {

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

    // JARONS POST CODE HERE
  };

});