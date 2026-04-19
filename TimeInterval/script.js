let progress = document.querySelector(".progress");
let percent = document.querySelector(".percent");
let btn = document.getElementById("downloadBtn");

btn.onclick = function(){

let count = 0;

let download = setInterval(function(){

count++;

progress.style.width = count + "%";
percent.textContent = count + "%";

if(count == 100){
clearInterval(download);
percent.textContent = "Download Complete ✅";
}

},50);

}


setTimeout(function(){

document.getElementById("alertBox").style.display = "none";

},3000);