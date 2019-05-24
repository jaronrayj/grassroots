$(document).ready(function () {
  $(document).on("submit", ".create-user", function (e) {
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
      $("#password2-validate").text("These passwords do not match.");
    } else {
      var newUser = {
        user_name: username,
        password: pwd,
        email: email
      };

      console.log(newUser);

      $.post("/api/signup", newUser, function (data, status) {
        // alert("Data: " + data + "\nStatus: " + status);
        console.log(status);
        location.replace("/projects");
      });
    }
  });
  // $(document).on("submit", ".login", loginUser);
});
