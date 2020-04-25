var btn = document.getElementById("btn");
btn.addEventListener("click", moveForward);
function moveForward(){
  console.log("button clicked");
  window.open("./final.html", "_self");
}
