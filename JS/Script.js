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