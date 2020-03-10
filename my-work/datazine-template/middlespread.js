console.log("js loaded. hello!");

// console.log(document.getElementById("viz-container"));
let viz = d3.select("#container")
  .append("svg")
    .attr("id", "viz")
    .attr("width", 1200)
    .attr("height", 800)
    .attr("fill", "blue")
  ;


function detail(dataPoint){
  console.log("incomingData IN DETAIL", dataPoint);
  return dataPoint["date"];
}

function textColor(dataPoint){
  if(dataPoint["weather"]=="sunny"){
    return "orange";
  } else if(dataPoint["weather"]=="rainy"){
    return "blue";
  } else {
    return "gray";
  }
}

// function ylocation(dataPoint){
//   if(dataPoint["lightIntensity"]=="low"){
//     return 50;
//   } else if(dataPoint["lightIntensity"]=="medium-low"){
//     return 150;
//   } else if(dataPoint["lightIntensity"]=="medium"){
//     return 250;
//   } else if(dataPoint["lightIntensity"]=="medium-strong"){
//     return 350;
//   } else if(dataPoint["lightIntensity"]=="medium-high"){
//     return 350;
//   } else if(dataPoint["lightIntensity"]=="strong"){
//     return 450;
//   } else {
//     return 550;
//   }
// }
//
// function xlocation(dataPoint){
//   if(dataPoint["weather"]=="sunny"){
//     return 150;
//   } else if(dataPoint["weather"]=="rainy"){
//     return 300;
//   } else {
//     return 450;
//   }
// }
//
// function groupPositon(dataPoint){
//   let x = xlocation(dataPoint);
//   let y = ylocation(dataPoint);
//   return "translate(" + x + "," + y + ")";
// }
function randomGroupPosition(){
  let x = Math.random() * 1000;
  let y = Math.random() * 600;
  return "translate(" + x + "," + y + ")";
}

function light(dataPoint){
  if(dataPoint["lightIntensity"]=="low"){
    return 0.1;
  } else if(dataPoint["lightIntensity"]=="medium-low"){
    return 0.25;
  } else if(dataPoint["lightIntensity"]=="medium"){
    return 0.5;
  } else if(dataPoint["lightIntensity"]=="medium-strong"){
    return 0.75;
  } else if(dataPoint["lightIntensity"]=="medium-high"){
    return 0.75;
  } else if(dataPoint["lightIntensity"]=="strong"){
    return 0.9;
  } else {
    return 1;
  }
}

function doingW(dataPoint){
  if(dataPoint["whatWasIDoing"]=="studying" || dataPoint["whatWasIDoing"]=="in class"){
    return "none";
  } else if(dataPoint["whatWasIDoing"]=="getting up" || dataPoint["whatWasIDoing"]=="checking my phone"){
    return "black";
  }
}

function doingWidth(dataPoint){
  if(dataPoint["whatWasIDoing"]=="studying" || dataPoint["whatWasIDoing"]=="getting up"){
    return 25;
  } else{
    return 10
  }
}


function gotData(incomingData){
  console.log("new data is", incomingData);

  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
      .append("g")
        .attr("class", "datagroup")
  ;

  datagroups
      .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 50)
        .attr("height", 50)
        .attr("fill", "blue")
        .style("opacity",light)
        .attr("class","lightInt")
  ;

  datagroups
      .append("circle")
        .attr("cx", 15)
        .attr("cy", 5)
        .attr("r", 10)
        .attr("fill", textColor)
        .attr("class", "weather")
  ;

  datagroups
      .append("rect")
        .attr("x", 12)
        .attr("y", 20)
        .attr("width", doingWidth)
        .attr("height", 10)
        .attr("fill", doingW)
        .attr("strokeWeight", 2)
        .attr("stroke", "black")
        .attr("class", "doingWhat")
  ;

  datagroups

  datagroups
      .append("text")
        .style("fill", "black")
        .style("font-size", 20)
        .attr("dy", 10)
        .attr("dx", 10)
        .attr("text-anchor", "middle")
        .attr("textLength", "50")
        .attr("font-family", "Rockwell")
        .text(detail)
        .attr("class", "textContent")
  ;

  datagroups.attr("transform", randomGroupPosition);
}

d3.json("data.json").then(gotData);
