// var btn = document.getElementById("btn");
// btn.addEventListener("click", moveForward);
// function moveForward(){
//   console.log("button clicked");
//   window.open("./viz2.html", "_self");
// }
console.log("js loaded");


let w = window.innerWidth;
let h = window.innerHeight;

let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "black")
;

d3.json("countries.geojson").then(function(geoData){
  d3.csv("Meteorite_Landings.csv").then(function(incomingData){
    console.log(geoData);
    let projection = d3.geoEqualEarth()//a projection from d3 library
      .translate([w, h])
      .fitExtent([[0, 0], [w-100, h]], geoData);
    let pathMaker = d3.geoPath(projection);
    viz.selectAll(".countries").data(geoData.features).enter()
      .append("path")
        .attr("d", pathMaker)
        .attr("fill", "black")
        .attr("stroke", "white")
    ;











  })//end of incomingdata function
})//end of geodata function
