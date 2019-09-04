$(function() {
    // Loading Cake Deco articles from CSV file
    $.ajax({
        type: "GET",
        url: "./csv/cakes.csv",
        dataType: "text",
        success: function(data) {
            displayData(data);
            //console.log(data);
        }
    });

    // Loading the GitHub projects
    $.ajax({
        type: "GET",
        jsonp: true,
        url: "https://api.github.com/users/RalsD/repos",
        dataType: "json",
        success: function(data) {
            displayRepos(data);
            //console.log(data);
        }
    });

    //Displaying the GitHub repositories
    function displayRepos(data) {
        for (i = 0; i < data.length; i++) {
            let listItem = $("<li>", { "class": "inner-list" });
            $("#education4").append(listItem);
            let urlRepo = $("<a>", { "href": data[i].html_url, "target": "_blank" });
            urlRepo.append(data[i].html_url);
            listItem.append(data[i].name + " - ");
            listItem.append(urlRepo);
        }
    }


    //Displaying the JSON objects - image and a description on Cake Deco page
    function displayData(data) {
        // Parsing JSON objects into an array articleList
        var articleList = $.csv.toObjects(data);
        //console.log(articleList[0].imageUrl);
        // Looping through the list and adding a div for each JSON object
        for (i = 0; i < articleList.length; ++i) {
            let divList = $("<div>", { "class": "div-cont", "id": "div-" + i });
            $("#cakes-container").append(divList);
            let image = $("<img>", { "class": "article-image", "src": articleList[i].imageUrl });
            divList.append(image);
            divList.append($("<br>"));
            divList.append(articleList[i].description);
            let button = $("<a>", { "href": articleList[i].ahref, "id": "button-" + i });
            button.append("Read more...");
            divList.append($("<br>"));
            divList.append(button);
        }
    }

    // Hover over SVG images function
    $(".svg-s").mouseenter(function() {
        $(".svg-s").css("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)");
    });

    $(".svg-s").mouseleave(function() {
        $(".svg-s").css("box-shadow", "none");
    });

    //The About page interactive list handling
    $("#education1").hide();
    $("#education2").hide();
    $("#education3").hide();
    $("#education4").hide();

    //The About page hover over image event to hint the user that he can expand the list.
    $(".cv-icons").mouseenter(function(){
        $(".cv-icons").attr("title","Click Me!");
    });

    //Click events for all Resume sections
    //Showing and hiding the contents of each on a click event.
    $("#edu1").click(function() {
        $("#education1").toggle();
    });

    $("#edu2").click(function() {
        $("#education2").toggle();
    });

    $("#edu3").click(function() {
        $("#education3").toggle();
    });

    $("#edu4").click(function() {
        $("#education4").toggle();
    });

    //Loading the locally stored existing comments on the page's initial loading
    var comments = JSON.parse(localStorage.getItem('commentsList'));
    if (comments != undefined) {
        for (i = 0; i < comments.items.length; i++) {
            let listItem = $("<li>");
            $("#comments-list").append(listItem);
            listItem.append(comments.items[i]);
        }

    }

    //Submitting comments:
    //This function will grab the comment and the commentator's name 
    //and save them in the local storage, display the current list of comments
    //that is located in the local storage plus the last added comment
    $("#submit-comment").click(function() {
        //console.log("Hi");
        var commentText = $("input#commentator").val() + " : " + $("textarea#comment").val();
        if($(commentText.length>20)){
            var i=20;
            var n=commentText.length;
            while(i<n){
                commentText = commentText.substring(0,20) + "<br>" +commentText.substring(20,commentText.length);
                i=i+24;
            }
            
        }
        var comments = JSON.parse(localStorage.getItem('commentsList'));
        //if commentsList is empty
        if (comments == undefined) {
            comments = {
                "items": []
            }
            comments.items[0] = commentText;
        } else {
            comments.items.push(commentText);
        }
        let listItem = $("<li>");
        $("#comments-list").append(listItem);
        listItem.append(commentText);

        localStorage.setItem('commentsList', JSON.stringify(comments));
        //Clearing the fields after submitting the comment
        $("input#commentator").val('');
        $("textarea#comment").val('');
    });
    //Uncomment the following row in order to clear your local storage on the next page load
    //localStorage.clear();
});