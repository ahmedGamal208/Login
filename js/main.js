// Selecting inputs
var loginEmail = document.getElementById("signinEmail");
var loginPassword = document.getElementById("signinPassword");

var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");


var allUsers = []

if (localStorage.getItem("all") != null) {
    allUsers = JSON.parse(localStorage.getItem("all"))
}

var loginBtn = document.querySelector(".loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", getSigninValues);
}

var signupBtn = document.querySelector(".signupBtn");
if (signupBtn) {
    signupBtn.addEventListener("click", getSignupValues)
}

// sign in function
function getSigninValues() {

    if (!checkSigninEmpty()) {
        document.getElementById("warning").innerHTML = '<p id="warning" class="text-danger m-3">All inputs required</p>'
        return;
    } // checks if sign in inputs are empty

    var login = {
        email: loginEmail.value.toLowerCase(),
        password: loginPassword.value,
    }

    var storedUsers = JSON.parse(localStorage.getItem("all")) || [];

    // checks if the user details entered are in the local storage
    var userFound = false;
    for (var i = 0; i < storedUsers.length; i++) {
        if (storedUsers[i].email === login.email && storedUsers[i].password === login.password) {
            userFound = true;
            document.getElementById("warning").innerHTML =
                '<p id="warning" class="text-success m-3">Sign-in successful! Redirecting...</p>';
            localStorage.setItem("username", storedUsers[i].name);
            localStorage.setItem("isLoggedIn", "true");
            setTimeout(function () {
                window.location.href = "home.html";
            }, 500); // will redirect to home page within 0.5s
            break;
        } else {
            document.getElementById("warning").innerHTML =
                '<p id="warning" class="text-danger m-3">Invalid email or password</p>';
        }
    }
}

// sign up function
function getSignupValues() {

    if (!checkSignupEmpty()) {
        document.getElementById("warning").innerHTML = '<p id="warning" class="text-danger m-3">All inputs required</p>'
        return;
    } // checks if sign up inputs are empty

    var UserSignup = {
        name: signupName.value,
        email: signupEmail.value.toLowerCase(),
        password: signupPassword.value,
    }
    
    var storedUsers = JSON.parse(localStorage.getItem("all")) || [];
    // checks for duplicated emails
    for (var i = 0; i < storedUsers.length; i++) {
        if (storedUsers[i].email === UserSignup.email) {
            document.getElementById("warning").innerHTML =
                '<p id="warning" class="text-danger m-3">This email is already registered. Please use a different email.</p>';
            return;
        }
    }

    // checks if the regex made for username matching the entered value
    if (!nameRegex.test(UserSignup.name)) {
        document.getElementById("warning").innerHTML =
            '<p id="warning" class="text-danger m-3">Invalid Name</p>';
        return;
    }
    // checks if the regex made for email matching the entered value
    if (!emailRegex.test(UserSignup.email)) {
        document.getElementById("warning").innerHTML =
            '<p id="warning" class="text-danger m-3">Invalid Email</p>';
        return;
    }
    // checks if the regex made for password matching the entered value
    if (!passwordRegex.test(UserSignup.password)) {
        document.getElementById("warning").innerHTML =
            '<p id="warning" class="text-danger m-3">Invalid Password. Please enter at least 6 characters or digits</p>';
        return;
    }

    allUsers.push(UserSignup)  // adds the signed up user to the array

    localStorage.setItem("all", JSON.stringify(allUsers))
    setTimeout(function () {
        window.location.href = "index.html";
    }, 500); // redirects to the login page within 0.5s

    document.getElementById("warning").innerHTML =
        '<p id="warning" class="text-success m-3">Signup Successful! Redirecting...</p>';
}

// function to check for empty values in signup page
function checkSignupEmpty() {
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}

// function to check for empty values in login page
function checkSigninEmpty() {
    if (loginEmail.value == "" || loginPassword.value == "") {
        return false
    } else {
        return true
    }
}

// displays the username in the home page
function displayUsername() {
    var username = localStorage.getItem("username");

    if (username) {
        document.getElementById("welcomeMessage").innerText = "Welcome, " + username;
    }
}

var logoutBtn = document.querySelector(".logoutBtn")
if (logoutBtn) {
    logoutBtn.addEventListener("click", logout)
}

// logout function
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "index.html";  // redirects to the login page
}

// checks if the user is logged in. if not, the user wont be able to access the home page and will be redirected to login page
window.onload = function () {
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        if (window.location.pathname == "/home.html") {
            window.location.href = "index.html";
        }
    } else {
        displayUsername();
    }
};

// regex made for sign up page inputs
nameRegex = new RegExp("^[a-zA-Z\s'-]{2,50}$")
emailRegex = new RegExp("^[^\s@]+@[^\s@]+\.[^\s@]+$")
passwordRegex = new RegExp("^.{6,}$")
