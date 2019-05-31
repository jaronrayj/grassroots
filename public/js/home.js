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
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var user_nameInput = $("input#user_name-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      user_name: user_nameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.user_name || !userData.password) {
      $("#password-login-validate").text("Please enter your password...");
      $("#username-login-validate").text("Please enter your username...");
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.user_name, userData.password);
    user_nameInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(user_name, password) {
    $.post("/api/login", {
      user_name: user_name,
      password: password
    })
      .then(function (data) {
        window.location.replace(data);
        // If there's an error, log the error
      })
      .catch(function (err) {
        if (err) {
          $("#password-login-validate").text(
            "Please make sure your password is correct..."
          );
          $("#username-login-validate").text(
            "Please make sure your username is correct..."
          );
        }
      });
  }
});
