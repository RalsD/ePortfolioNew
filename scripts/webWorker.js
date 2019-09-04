var i = -1;
//The full text that is to be displayed gradually
var textFull = "“You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character.”<br> – Unknown <br><br> What now?";
var textBuild = "";

//This function will build the textBuild string by grabbing each character from the 
//textFull string. It will post a character on the web page on each iteration.
function textBuilding() {
    if (i < textFull.length) {
        i = i + 1;
        //Building the text on each itteration
        textBuild += (textFull.charAt(i));
        //Posting the current build into the page
        postMessage(textBuild);
    } else {
        w.terminate();
        w = undefined;
    }
    setTimeout("textBuilding()", 250);
}

//Calling the textBuild function
textBuilding();