const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");

const confirmPasswordInput = document.getElementById("confirm_password");
const confirmPasswordToggle = document.getElementById("confirmPasswordToggle");


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


confirmPasswordToggle.addEventListener("click", function () {

    if (confirmPasswordInput.type === "password") {

        confirmPasswordInput.type = "text";

        confirmPasswordToggle.textContent = "🙈";

        confirmPasswordToggle.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        confirmPasswordInput.type = "password";

        confirmPasswordToggle.textContent = "👁";

        confirmPasswordToggle.setAttribute(
            "aria-label",
            "Show password"
        );

    }

});