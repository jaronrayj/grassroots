$(document).ready(function () {

  // JQuery Field ID's

  $(document).on("submit", ".create-user", function (e) {
    e.preventDefault();

    let $pwd = $("#pwd").val().trim();
    let $pwd2 = $("#pwd2").val().trim();

    if ($pwd !== $pwd2) {
      alert("Those passwords do not match");
    } else {
      let newUser = {
        user_name: $("#username").val().trim(),
        password: $("#pwd").val().trim(),
        email: $("#email").val().trim()
      };

      console.log(newUser)

      $.post("/api/users", newUser, function (data, status) {
        alert("Data: " + data + "\nStatus: " + status);
      });
    }

  });
  // $(document).on("submit", ".login", loginUser);

});