let form = document.querySelector("form");

let email = document.querySelector("#email");
let password = document.querySelector("#password");

let emailError = document.querySelector("#emailError");
let passError = document.querySelector("#passError");

form.addEventListener("submit", function(e){

    e.preventDefault();

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let valid = true;

    // Email validation
    if(emailPattern.test(email.value)){
        emailError.style.display = "none";
    }else{
        emailError.style.display = "block";
        valid = false;
    }

    // Password validation
    if(passwordPattern.test(password.value)){
        passError.style.display = "none";
    }else{
        passError.style.display = "block";
        valid = false;
    }

    // If both correct
    if(valid){
        alert("Form Successfully Submitted");
        form.reset();
    }

});


