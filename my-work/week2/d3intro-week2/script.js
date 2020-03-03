console.log("js loaded. hello!");

// console.log(document.getElementById("viz-container"));
let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
  ;


function detail(dataPoint){
  console.log("incomingData IN DETAIL", dataPoint);
  return dataPoint["weather"];
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

function ylocation(dataPoint){
  if(dataPoint["lightIntensity"]=="low"){
    return 50;
  } else if(dataPoint["lightIntensity"]=="medium-low"){
    return 150;
  } else if(dataPoint["lightIntensity"]=="medium"){
    return 250;
  } else if(dataPoint["lightIntensity"]=="medium-strong"){
    return 350;
  } else if(dataPoint["lightIntensity"]=="medium-high"){
    return 350;
  } else if(dataPoint["lightIntensity"]=="strong"){
    return 450;
  } else {
    return 550;
  }
}

function xlocation(dataPoint){
  if(dataPoint["weather"]=="sunny"){
    return 150;
  } else if(dataPoint["weather"]=="rainy"){
    return 300;
  } else {
    return 450;
  }
}


function gotData(incomingData){
  console.log("new data is", incomingData);
  viz.selectAll("text").data(incomingData).enter()
      .append("text")
        .style("fill", textColor)
        .style("stroke", "white")
        .style("font-size", 40)
        .attr("dy", ylocation)
        .attr("dx", xlocation)
        .attr("text-anchor", "middle")
        .attr("textLength", "100")
        .text(detail)
  ;
}

d3.json("data.json").then(gotData);
