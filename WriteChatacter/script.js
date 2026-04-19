let inp = document.querySelector("input");
let span = document.querySelector("span");

inp.addEventListener("input", function(){

    let remaining = 20 - inp.value.length;

    span.textContent = remaining;

    if(remaining < 0){
        span.style.color = "red";
    } else {
        span.style.color = "white";
    }

});