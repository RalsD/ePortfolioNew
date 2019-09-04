//Setting audioName variable to hold the audio element of the About Page
var audioName = document.getElementById("audioName");
//Web worker variable
var w;

//The function will display the menu in a "Burger" style, it will add the classes that are defined in the css
function burgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


//Playing the audio file
function playAudio() {
    var audioName = document.getElementById("audioName");
    audioName.play();
}

//Animation of the class overlay starts on page loading
window.addEventListener("load", function() {
    var nodes = document.querySelectorAll(".overlay");
    for (var i = 0; i < nodes.length; i++) {
        var words = nodes[i].innerText;
        var html = "";
        for (var i2 = 0; i2 < words.length; i2++) {
            if (words[i2] == " ") {
                html += words[i2];
            } else {
                html += "<span>" + words[i2] + "</span>";
            }
        }
        nodes[i].innerHTML = html;
    }
});

//Managing contact form submission
function SubmitForm() {
    let name1 = document.getElementById("user-name").value;
    let email = document.getElementById("email").value;
    let messageText = document.getElementById("messageText").value;
    if (name1 == "" || email == "" || messageText == "") {
        alert("Empty fields!");
    } else {
        document.getElementById("text1").innerHTML = "";
        document.getElementById("form-mail").innerHTML = "";
        document.getElementById("message-mail").innerHTML = "Thank you for sending me a message, " + name1 + "!";

    }
}

//Web worker loading
function websteros() {
    if (typeof(Worker) !== "undefined") {
        // Yes! Web worker support!
        if (typeof(w) == "undefined") {
            w = new Worker("./scripts/webWorker.js");
            w.onmessage = function(event) {
                document.getElementById("wwText").innerHTML = event.data;
            };
        }
    } else {
        alert("Sorry, your browser doesn't support a Web Worker Service!");
    }
}

//Web worker termination
function stopWorker() {
    w.terminate();
    w = undefined;
}