$(document).ready(function () {
    let projectArray = [];
    let offset = 0;
    $.get("/api/projects",
        function (data) {
            projectArray = data;
            card(data);
        }
    );

    function card(project) {

        for (let i = offset; i < offset + 3; i++) {


            let newDiv = $("<div>").addClass("card projectCard").attr("style", "width: 18rem;");
            let img = $("<img>").addClass("card-img-top").attr("src", "https://via.placeholder.com/100x50");
            let cardBody = $("<div>").addClass("card-body cardBody");
            let cardTitle = $("<h5>").addClass("card-title").text(project[i].title);
            let cardText = $("<p>").addClass("card-text").text(project[i].location);
            let button = $("<a>").addClass("btn btn-default viewBtn").attr("href", "/projects/" + project[i].id).text("Find out more!");

            cardBody.append(cardTitle).append(cardText);
            newDiv.append(img).append(cardBody).append(button);
            $(".firstRow").append(newDiv);
        }

        offset += 3;

        for (let i = offset; i < offset + 3; i++) {


            let newDiv = $("<div>").addClass("card").attr("style", "width: 18rem;");
            let img = $("<img>").addClass("card-img-top").attr("src", "https://via.placeholder.com/100x50");
            let cardBody = $("<div>").addClass("card-body cardBody");
            let cardTitle = $("<h5>").addClass("card-title").text(project[i].title);
            let cardText = $("<p>").addClass("card-text").text(project[i].location);
            let button = $("<a>").addClass("btn btn-default viewBtn").attr("href", "/projects/" + project[i].id).text("Find out more!");

            cardBody.append(cardTitle).append(cardText);
            newDiv.append(img).append(cardBody).append(button);
            $(".secondRow").append(newDiv);
        }

        offset += 3;
    }

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

    $(document).on("click", "#more", function () {

        if (offset + 6 > projectArray.length) {
            offset = projectArray.length - 6;
        }
        $(".firstRow").empty();
        $(".secondRow").empty();
        card(projectArray);
    });

    //Project copy button
    $(document).on("click", ".copy-project", function () {
        let projectId = $(this).attr("project-id");

        $.get("/api/projects/" + projectId, function (data) {

            $("#title").val(data.title);
            $("#description").val(data.description);
            $("#number-of-people").val(data.number_of_people);
            $(`select#category option:contains("${data.category_type}")`).prop("selected", true);
            $("#copy-project-modal").modal();
        });
    });

    $(document).on("submit", ".copy-project-form", function (e) {
        e.preventDefault();

        let title = $("#title").val().trim();
        let description = $("#description").val().trim();
        let location = $("#location").val().trim();
        let datetime = $("#date").val().split("T");
        let date = datetime[0];
        let time = datetime[1];
        let numberOfPeople = $("#number-of-people").val().trim();
        let category = $("#category").val();

        let newProject = {
            title: title,
            description: description,
            location: location,
            time: time,
            date: date,
            number_of_people: numberOfPeople,
            category_type: category
        };

        $.post("/api/projects", newProject, function (data, status) {
            if (status) {
                alert(`Project ${title} is created!`);
                window.location.replace("/my/projects");
            };
        });
    });
});