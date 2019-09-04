$(function() {
    //Getting the data from the csv file
    $.ajax({
        type: "GET",
        url: "./csv/paintings.csv",
        dataType: "text",
        success: function(data) {
            displayArticles(data);
        }
    });

    //Displaying the data, structuring it first as JSON objects and adding a div for each object
    function displayArticles(data) {
        var paintingsList = $.csv.toObjects(data);
        for (i = 0; i < paintingsList.length; ++i) {
            let div = $("<div>", { "class": "div-container" });
            $("#paintings-container").append(div);
            let image = $("<img>", { "class": "paintings-image", "src": paintingsList[i].url, "title": "Click on the image!" });
            div.append($("<br>"));
            div.append(image);
            div.append($("<br>"));
            let title = $("<h3>").append(paintingsList[i].title);
            div.append(title);
        }

        //Image pops up when being clicked
        $(".paintings-image").click(function() {
            $("#div-pop").css("display", "block");
            $("#image-pop").attr("src", $(this).attr('src'));
        });
        //Closing the pop up image screen/div
        $(".x-pop").click(function() {
            $("#div-pop").css("display", "none");
        });
    }

});