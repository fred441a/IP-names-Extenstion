let ip_input = document.getElementById("ip_input");
let name_output = document.getElementById("name_output");
let convert_button = document.getElementById("convert_button");

let names = [];
let surnames = [];

fetch("../names.csv")
.then(response => response.text())
.then((text) => {names = text.split(",")})

fetch("../surnames.csv")
.then(response => response.text())
.then((text) => {surnames = text.split(",")})




convert_button.addEventListener("click", (event) => {
    name_output.style.color = "black";
    name_output.innerHTML = "";
    //** @type{string} */
    let ip = ip_input.value;
    let ip_segments = [];

    try {
        ip_segments = ip.split(".");
    } catch (event) {
        not_ip();
        return
    }

    if (ip_segments.length != 4) {
        not_ip();
        return
    }

    for ([i, byte_string] of ip_segments.entries()) {
        let byte = Number(byte_string);
        if (byte > 255) {
            not_ip();
            return
        }
        ip_segments[i] = byte;

    }

    name_output.innerHTML = `${names[ip_segments[0]]} ${surnames[ip_segments[1]]} ${surnames[ip_segments[2]]} ${surnames[ip_segments[3]]}` 



});

function not_ip() {
    name_output.style.color = "red";
    name_output.innerHTML = "Your input does not match any ipv4!";
}