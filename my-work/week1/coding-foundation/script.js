var btn = document.getElementById('Btn');

function showIt() {
  console.log("hello");
  var n = document.getElementById('inputBox').value;
  console.log(n);
  var i;
  for (i = 0; i < n; i++){
    console.log(i);
    var square = document.createElement("img");
    square.src = "img.jpeg";
    square.className = "square";
    document.body.appendChild(square);
  }
}
btn.addEventListener("click",showIt)
