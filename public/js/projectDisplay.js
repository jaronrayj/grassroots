$(document).ready(function () {
    let projectArray = [];
    let offset = 0;
    $.get("/api/projects",
        function (data) {
            projectArray = data;
            card(data);
        }
    );

    function displayInfo (row, project){
        for (let i = offset; i < offset + 3; i++) {


            let newDiv = $("<div>").addClass("card projectCard").attr("style", "width: 18rem;");
            let img = $("<img>").addClass("card-img-top").attr("src", "https://via.placeholder.com/100x50");
            let cardBody = $("<div>").addClass("card-body cardBody");
            let cardTitle = $("<h5>").addClass("card-title").text(project[i].title);
            let cardText = $("<p>").addClass("card-text").text(project[i].location);
            let button = $("<button>").addClass("btn moreInfo btn-default viewBtn").attr("href", "/projects/" + project[i].id).text("Find out more!").data("toggle", "modal").data("target", "#projectModal");

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
    // todo click on "find out more" and pull up modal with more info and copy button along w/join. Set up data-id on buttons
    $(document).on("click", ".viewBtn", function () {
        let projectId = $(this).attr("project-id");

        $.get("/api/projects/" + projectId, function (data) {
            $(".modal-title-more").text(data.title);
            $(".description").text(data.description);
            $(".location").text(data.location);
            $(".time").text(data.time);
            $(".date").text(data.date);
            $(".number-of-people").text(data.number_of_people)
            $(".category").text(data.category_type);
            $(".copy-project").attr("project-id", projectId);
            $(".join-project").attr("project-id", projectId);
            $("#find-out-more-modal").modal();
        });
    });

    //Project Join Button
    $(document).on("click", ".join-project", function () {
        let projectId = $(this).attr("project-id");

        $.post(`/api/projects/${projectId}/adduser`, function (data, status) {
            if (status) {
                alert(`Project Joined`);
                window.location.replace("/my/projects");
            };
        });
    });

    //Project copy button
    $(document).on("click", ".copy-project", function () {
        let projectId = $(this).attr("project-id");

        $.get("/api/projects/" + projectId, function (data) {
            $("#find-out-more-modal").modal("hide");
            $("#title").val(data.title);
            $("#description").val(data.description);
            $("#number-of-people").val(data.number_of_people);
            $(`select#category option:contains("${data.category_type}")`).prop("selected", true);
            $("#copy-project-modal").modal();
        });
    });

    //Project copy submit
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