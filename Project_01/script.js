const users = [
{
name:"amisha rathore",
pic:"https://i.pinimg.com/736x/9a/7b/42/9a7b42a2c3c0a7c0d7c3f4c6b2e9e2b4.jpg",
bio:"silent chaos in a loud world 🖤 | not for everyone"
},
{
name:"kiara mehta",
pic:"https://i.pinimg.com/736x/1f/2f/85/1f2f856bf3a020ed8ee9ecb3306ae074.jpg",
bio:"main character energy 🎬 | coffee > everything ☕"
},
{
name:"isha oberoi",
pic:"https://i.pinimg.com/736x/23/48/7e/23487ef1268cfe017047a0640318c0d0.jpg",
bio:"walking through dreams | late night thinker 🌙"
},
{
name:"anjali verma",
pic:"https://i.pinimg.com/736x/8c/7d/62/8c7d62f4b8a7a1d4c2c6c0d4f3e7f8b9.jpg",
bio:"lost in music 🎧 | midnight vibes"
},
{
name:"riya kapoor",
pic:"https://i.pinimg.com/736x/6a/54/7c/6a547c7d8e4b7f2d5c9e8a3b2c1d7e4f.jpg",
bio:"sunsets & soft songs 🌅 | vibing always"
},
{
name:"sanya malhotra",
pic:"https://i.pinimg.com/736x/4e/3b/0f/4e3b0fa3b1e4b1a9a5e6d4c3f2e1d0c9.jpg",
bio:"overthinking everything 💭 | but still smiling"
},
{
name:"tanya sharma",
pic:"https://i.pinimg.com/736x/2d/9f/5c/2d9f5c7e8a4b1d3f6c9e2a7b4d8f1c6e.jpg",
bio:"dream big ✨ | work harder 💻"
}
];

const cardsContainer=document.querySelector(".cards");
const search=document.querySelector(".search");

function showUsers(arr){

cardsContainer.innerHTML="";

arr.forEach(function(user){

let card=document.createElement("div");
card.className="card";

let img=document.createElement("img");
img.src=user.pic;
img.className="bg-img";

let blur=document.createElement("div");
blur.className="blurred-layer";
blur.style.backgroundImage=`url(${user.pic})`;

let content=document.createElement("div");
content.className="content";

let name=document.createElement("h3");
name.textContent=user.name;

let bio=document.createElement("p");
bio.textContent=user.bio;

content.appendChild(name);
content.appendChild(bio);

card.appendChild(img);
card.appendChild(blur);
card.appendChild(content);

cardsContainer.appendChild(card);

});

}

showUsers(users);

search.addEventListener("input",function(){

let value=search.value.toLowerCase();

let filtered=users.filter(function(user){
return user.name.toLowerCase().includes(value);
});

showUsers(filtered);

});