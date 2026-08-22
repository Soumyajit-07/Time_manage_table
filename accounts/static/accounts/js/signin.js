
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");

passwordToggle.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        passwordToggle.textContent = "🙈";
        passwordToggle.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        passwordInput.type = "password";

        passwordToggle.textContent = "👁";
        passwordToggle.setAttribute(
            "aria-label",
            "Show password"
        );

    }

});

