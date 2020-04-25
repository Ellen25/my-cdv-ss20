//the following code src from https://stackoverflow.com/questions/42003566/how-to-automatically-change-an-html-image-using-javascript
var imageSources = ["cover.gif", "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg"];
var index = 0;
setInterval (function(){
  console.log(imageSources.length);
  if (index === imageSources.length) {
    index = 7;
  }
  document.getElementById("comic").src = imageSources[index];
  index++;
}
 , 2000);
//

var btn = document.getElementById("comicButton")
btn.addEventListener("click", moveForward);
function moveForward(){
  console.log("button clicked");
  window.open("./viz1.html", "_self");
}
