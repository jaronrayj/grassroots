$(document).ready(function() {
  var projectArray = [];
  var offset = 0;
  $.get("/api/users/me",
    function (data) {
      projectArray = data.Projects;
      card(projectArray);
    }
  );

  function displayInfo(row, project) {
    if (project.length - offset < 3) {
      var length = project.length;
    } else {
      var length = offset + 3;
    }
    for (var i = offset; i < length; i++) {
      var newDiv = $("<div>")
        .addClass("card projectCard")
        .attr("style", "width: 18rem;");
      var pic = stockPhoto(project[i].category_type)
      var img = $("<img>").addClass("card-img-top").attr("src", pic);
      var cardBody = $("<div>").addClass("card-body cardBody");
      var cardTitle = $("<h5>").addClass("card-title").text(project[i].title);
      var cardText = $("<p>").addClass("card-text").text(project[i].location);
      var button = $("<button>").addClass("btn moreInfo btn-default viewBtn").attr("data-project", project[i].id).text("Find out more!").data("toggle", "modal").data("target", "#projectModal");

      cardBody.append(cardTitle).append(cardText);
      newDiv.append(img).append(cardBody).append(button);
      $(row).append(newDiv);
    }

    offset += 3;
  }

  function card(project) {
    displayInfo(".firstRow", project);
    displayInfo(".secondRow", project);
  }

//  Go back through projects available
  $(document).on("click", "#back", function () {

    if (offset - 12 <= 0) {
      offset = 0;
      $(".firstRow").empty();
      $(".secondRow").empty();
      card(projectArray);
    } else {
      $(".firstRow").empty();
      $(".secondRow").empty();
      offset -= 12;
      card(projectArray);
    }
  });

  //   Go forward through projects available
  $(document).on("click", "#more", function () {
    if (offset + 6 > projectArray.length) {
      offset = projectArray.length - 6;
    }
    $(".firstRow").empty();
    $(".secondRow").empty();
    card(projectArray);
  });

  //Project update button
  $(document).on("click", ".update-project", function () {
    var projectId = $(this).attr("data-project");
   
    $.get("/api/projects/" + projectId, function (data) {
      var date = `${data.date}T${data.time}`
      $("#find-out-more-modal").modal("hide");
      $("#title").val(data.title);
      $("#description").val(data.description);
      $("#location").val(data.location);
      $("#date").val(date);
      $("#number-of-people").val(data.number_of_people);
      $(`select#category option:contains("${data.category_type}")`).prop("selected", true);
      $(".update-project-form").attr("data-project",projectId);
      $("#update-project-modal").modal();
    });
  });

  //Pull up modal with all project info, and copy buttons
  $(document).on("click", ".viewBtn", function () {
    var projectId = $(this).attr("data-project");

    $.get("/api/projects/" + projectId, function (data) {
      var date = data.date.substring(5, 8) + data.date.substring(8, 10) + "-" + data.date.substring(0, 4);
      var pic = stockPhoto(data.category_type);
      $(".moreImg").attr("src", pic);
      $(".modal-title-more").text(data.title);
      $(".description").text(data.description);
      $(".location").text(data.location);
      $(".time").text(data.time);
      $(".date").text(date);
      $(".number-of-people").text(data.number_of_people)
      $(".category").text(data.category_type);
      $(".update-project").attr("data-project", projectId);
      $(".delete-project").attr("data-project", projectId);
      $("#find-out-more-modal").modal();
    });
  });

  function stockPhoto(category){
    switch (category) {
      case "Cleanup":
        var pic = "../images/cleaning.jpg"
        break;
      case "Community Service":
        var pic = "../images/service.jpg"
        break;
      case "Volunteering":
        var pic = "../images/volunteer.jpg"
        break;
      case "Food Bank":
        var pic = "../images/food.jpg"
        break;
      case "Trashtag":
        var pic = "../images/trashtag.jpg"
        break;

      default:
        break;
    }
    return pic;
  }

  if(projectArray > 6){
    $("#more").show();
    $("#back").show();
} else {
    $("#more").hide();
    $("#back").hide();

  }

  //Project update submit
  $(document).on("submit", ".update-project-form", function (e) {
    e.preventDefault();
    var projectId = $(this).attr("data-project");
    var title = $("#title").val().trim();
    var description = $("#description").val().trim();
    var location = $("#location").val().trim();
    var datetime = $("#date").val().split("T");
    var date = datetime[0];
    var time = datetime[1];
    var numberOfPeople = $("#number-of-people").val().trim();
    var category = $("#category").val();

    var updateProject = {
      title: title,
      description: description,
      location: location,
      time: time,
      date: date,
      number_of_people: numberOfPeople,
      category_type: category
    };

    let url = "/api/projects/" + projectId;

    $.ajax({
      type: "put",
      data: updateProject,
      url: url
    }).then(function() {
      alert("This project has been updated");
      window.location.reload();
    });
  });
  
  //Project delete
  $(document).on("click", ".delete-project", function () {
    let projectId = $(this).attr("data-project");
    var url = "/api/projects/" + projectId;
    if (confirm("Are you sure you want to delete this project?")) {

      $.ajax({
        type: "delete",
        url: url
      }).then(function () {
        window.location.reload();
      });
    };
  });
});
