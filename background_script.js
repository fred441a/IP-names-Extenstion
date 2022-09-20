let names = [];
let surnames = [];

let connection;

if (typeof chrome !== "undefined") {
    if (typeof browser !== "undefined") {
        connection = browser
    } else {
        connection = chrome
    }
}

fetch("../names.csv")
    .then(response => response.text())
    .then((text) => { names = text.toLowerCase().split(",") });

fetch("../surnames.csv")
    .then(response => response.text())
    .then((text) => { surnames = text.toLowerCase().split(",") });





connection.omnibox.onInputEntered.addListener((url, tab) => {
    let name_segments = url.split(" ");
    if (name_segments.length != 4) {
        return
    }

    let ip = "";

    try {
        ip = `${names.indexOf(name_segments[0].toLowerCase())}.${surnames.indexOf(name_segments[1].toLowerCase())}.${surnames.indexOf(name_segments[2].toLowerCase())}.${surnames.indexOf(name_segments[3].toLowerCase())}`;
    } catch (e) {
        return
    }

    if (ip.includes("-1")) {
        return
    }


    connection.tabs.update({ url: `http://${ip}/` })




});