var imageSources = ["cover.gif", "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg"];
var img = document.getElementById("comic");
var index = 1;
img.addEventListener("click", moveForward);
function moveForward(){
  console.log("current index is", index);
  document.getElementById("comic").src = imageSources[index];
  if (index == 8){
    window.open("./viz1.html", "_self");
  }
    index ++;
}
