// ============================================================
// EVENT LISTENER 1 — click
// Clicking the button reveals a hidden classified warning.
//
// CSS Alteration 1: style.display  — makes hidden <p> visible
// CSS Alteration 2: style.color    — turns the message text red
// CSS Alteration 3: innerHTML      — writes new text into the <p>
// ============================================================
const warningBtn = document.getElementById("warningBtn");
const warningMsg = document.getElementById("warningMsg");

warningBtn.addEventListener("click", function () {

    // CSS Alteration 1 — change display to show hidden element
    warningMsg.style.display = "block";

    // CSS Alteration 2 — change the text color to red
    warningMsg.style.color = "red";

    // CSS Alteration 3 — innerHTML: inject new content into the element
    warningMsg.innerHTML = "&#9888; WARNING: These files are classified. Unauthorized access has been logged.";

    warningBtn.innerHTML = "[ FILES UNLOCKED ]";
});


// ============================================================
// EVENT LISTENER 2 — mouseover / mouseout
// Hovering over the Story section adds a CSS class to highlight
// it and changes the section heading color.
//
// CSS Alteration 4: classList.add()  — adds the "highlighted" class
// CSS Alteration 5: style.color      — changes the h3 heading color
// ============================================================
const storySection = document.getElementById("Story");
const storyHeading = storySection.querySelector("h3");

storySection.addEventListener("mouseover", function () {

    // CSS Alteration 4 — add a CSS class to the section
    storySection.classList.add("highlighted");

    // CSS Alteration 5 — change the heading color on hover
    storyHeading.style.color = "crimson";
});

storySection.addEventListener("mouseout", function () {
    storySection.classList.remove("highlighted");
    storyHeading.style.color = "";
});


// ============================================================
let lightMode = false;

document.addEventListener("keydown", function (event) {
    if (event.key === "d" || event.key === "D") {
        lightMode = !lightMode;

        if (lightMode) {
            // CSS Alteration 6 — switch background to light
            document.body.style.backgroundColor = "#f0f0f0";

            // CSS Alteration 7 — switch text color to dark
            document.body.style.color = "#111";

            document.getElementById("keyHint").innerHTML = 'Light mode ON — press "D" to switch back';
        } else {
            document.body.style.backgroundColor = "black";
            document.body.style.color = "";
            document.getElementById("keyHint").innerHTML = 'Press "D" to toggle light / dark mode';
        }
    }
});