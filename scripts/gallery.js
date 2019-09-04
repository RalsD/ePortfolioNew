$(function() {
    // Loading Cake Deco articles from CSV file
    $.ajax({
        type: "GET",
        url: "./csv/carousel.csv",
        dataType: "text",
        success: function(data) {
            displayData(data);
            console.log(data);
        }
    });
    //Displaying the JSON objects a.k.a. image and a description
    function displayData(data) {
        // Parsing JSON objects into an array articleList
        var picList = $.csv.toObjects(data);

        //Adding the first image that is going to have an extra class - active
        let divList = $("<div>", { "class": "item active" });
        $(".carousel-inner").append(divList);
        let image = $("<img>", { "class": "carousel", "width": "100%", "src": picList[0].url, "alt": picList[0].title });
        divList.append(image);
        let divInner = $("<div>", { "class": "carousel-caption" });
        divList.append(divInner);
        let heading = $("<h3>").append(picList[0].title);
        divInner.append(heading);
        let paragraph = $("<p>").append(picList[0].description);
        divInner.append(paragraph);
        let indicator = $("<li>", { "data-target": "#myCarousel", "data-slide-to": "0", "class": "active" });
        $("#indicator-list").append(indicator);

        // Looping through the list and adding a div for each JSON object extracted from the csv file
        for (i = 1; i < picList.length; ++i) {
            let divList = $("<div>", { "class": "item" });
            $(".carousel-inner").append(divList);
            let image = $("<img>", { "class": "carousel", "width": "100%", "src": picList[i].url, "alt": picList[i].title });
            divList.append(image);
            let divInner = $("<div>", { "class": "carousel-caption" });
            divList.append(divInner);
            let heading = $("<h3>").append(picList[i].title);
            divInner.append(heading);
            let paragraph = $("<p>").append(picList[i].description);
            divInner.append(paragraph);
            let indicator = $("<li>", { "data-target": "#myCarousel", "data-slide-to": i });
            $("#indicator-list").append(indicator);
        }
    }

});