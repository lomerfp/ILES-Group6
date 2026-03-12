// Simple login form validation
document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault(); // prevent actual submission
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    if(email === "" || password === ""){
        alert("Please enter both email and password");
    } else {
        alert("Login successful (frontend simulation only)");
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function(e) {
        // Get form values
        const fullname = form.fullname.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const confirmPassword = form.confirm_password.value;
        const course = form.course.value;

        // Simple email regex
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        // Validation checks
        if (fullname === "" || email === "" || password === "" || confirmPassword === "" || course === "") {
            alert("Please fill in all fields.");
            e.preventDefault();
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            e.preventDefault();
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            e.preventDefault();
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            e.preventDefault();
            return;
        }

        // If all checks pass, form will submit
    });
});