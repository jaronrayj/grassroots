$(document).ready(function () {
  $(document).on("submit", ".create-user", function (e) {
    e.preventDefault();

    var user_name = $("#username")
      .val()
      .trim();

    if (user_name.length < 6) {
      $("#username-validate").text(
        "Please have at least 6 characters in length"
      );
    }

    var email = $("#email")
      .val()
      .trim();
    var password = $("#pwd")
      .val()
      .trim();
    if (password.length < 6) {
      $("#password-validate").text(
        "Please have at least 6 characters in length"
      );
    }
    var pwdCheck = $("#pwd2")
      .val()
      .trim();

    if (password !== pwdCheck) {
      $("#password2-validate").text("These passwords do not match.");
    } else {
      // AUTHENTICATION WORKING //
      $.post("/api/signup", {
        user_name: user_name,
        password: password,
        email: email
      })
        .then(function (data) {
          window.location.replace(data);
        })
        .catch(function (err) {
          console.log(err.resposeJSON);
        });
    }
  });
  // $(document).on("submit", ".login", loginUser);
});
