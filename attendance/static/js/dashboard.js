console.log("MY NEW DASHBOARD JS IS LOADED");

const STATIONS = [
    "entry",
    "lunchout",
    "lunchin",
    "exit"
];

const punches = {
    entry: null,
    lunchout: null,
    lunchin: null,
    exit: null
};

let workedInterval = null;

// ----------------------------
// Live Clock
// ----------------------------

function updateClock() {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    document.getElementById("today-date").innerHTML =
        now.toLocaleDateString([], {
            weekday: "long",
            day: "numeric",
            month: "long"
        }).toUpperCase();

    const hour = now.getHours();

    let greeting = "Good Evening";

    if(hour < 12)
        greeting = "Good Morning";
    else if(hour < 17)
        greeting = "Good Afternoon";

    document.getElementById("greeting").innerHTML = greeting;
}

setInterval(updateClock,1000);
updateClock();


// ----------------------------
// Timeline
// ----------------------------

function updateTimeline(){

    const circles = document.querySelectorAll(".circle");

    circles.forEach((circle,index)=>{

        circle.classList.remove("active");
        circle.classList.remove("completed");

        if(index < currentStep){

            circle.classList.add("completed");
            circle.innerHTML="✓";

        }

        else if(index===currentStep){

            circle.classList.add("active");

        }

    });

    document.getElementById("progress-fill").style.width =
        (currentStep*33.33)+"%";
}


// ----------------------------
// Buttons
// ----------------------------

let currentStep = 0;

const buttons = [

document.getElementById("entry-btn"),
document.getElementById("lunchout-btn"),
document.getElementById("lunchin-btn"),
document.getElementById("exit-btn")

];

function enableButtons(){

    buttons.forEach(btn=>btn.disabled=true);

    if(currentStep<4)
        buttons[currentStep].disabled=false;

}

enableButtons();
updateTimeline();


// ----------------------------
// Time Format
// ----------------------------

function currentTime(){

    return new Date().toLocaleTimeString();

}


// ----------------------------
// Button Click
// ----------------------------

buttons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const key = STATIONS[index];

        // Entry
        if (key === "entry") {

            fetch("/check-in/", {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                }
            })
            .then(response => response.json())
            .then(data => {

                if (data.success) {

                    punches[key] = new Date();

                    document.getElementById("entry-time").innerHTML = data.time;

                    currentStep++;

                    updateTimeline();

                    enableButtons();

                    calculateHours();

                } else {

                    alert(data.message);

                }

            });

            return;
        }

        // Lunch Out
        if (key === "lunchout") {

            fetch("/lunch-out/", {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                }
            })
            .then(response => response.json())
            .then(data => {

                if (data.success) {

                    punches[key] = new Date();

                    document.getElementById("lunchout-time").innerHTML = data.time;

                    currentStep++;

                    updateTimeline();

                    enableButtons();

                    calculateHours();

                } else {

                    alert(data.message);

                }

            });

            return;
        }

        // Lunch In
        if (key === "lunchin") {

            fetch("/lunch-in/", {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                }
            })
            .then(response => response.json())
            .then(data => {

                if (data.success) {

                    punches[key] = new Date();

                    document.getElementById("lunchin-time").innerHTML = data.time;

                    currentStep++;

                    updateTimeline();
                    enableButtons();
                    calculateHours();

                } else {

                    alert(data.message);

                }

            });

            return;
        }
// Exit
        // Exit
if (key === "exit") {
    console.log ("Exit button is running");

    fetch("/check-out/", {
        method: "POST",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {

        console.log("CHECK OUT RESPONSE:", data);

        if (data.success) {

            punches[key] = new Date();

            document.getElementById("exit-time").innerHTML = data.time;

            currentStep++;

            updateTimeline();
            enableButtons();
            calculateHours();

            document.getElementById("day-status").innerHTML =
                "Day Complete";

        } else {

            alert(data.message || "Exit failed.");

        }

    })
    .catch(error => {

        console.error("Exit error:", error);
        alert("Something went wrong.");

    });

    return;
}

        });

    });

// ----------------------------
// Hours
// ----------------------------

function calculateHours(){

if(!punches.entry)
return;

if(workedInterval)
clearInterval(workedInterval);

workedInterval=setInterval(()=>{

const end=punches.exit || new Date();

let total=(end-punches.entry)/1000/60/60;

if(punches.lunchout){

const lunchEnd=punches.lunchin || end;

total-=(lunchEnd-punches.lunchout)/1000/60/60;

}

document.getElementById("worked-hours").innerHTML=
total.toFixed(2)+" hrs";

if(punches.exit){

document.getElementById("day-status").innerHTML=
"Day Complete";

clearInterval(workedInterval);

}

},1000);

}
function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {

        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {

            let cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + "=")) {

                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );

                break;
            }
        }
    }

    return cookieValue;
}
