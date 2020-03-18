console.log("js loaded. hello!");
let w = 2400;
let h = 800;
// console.log(document.getElementById("viz-container"));
let viz = d3.select("#container")
  .append("svg")
    .attr("id", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "#a5c9c8")
  ;


function detail(dataPoint){
  return dataPoint["date"];
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
  if(dataPoint["whatWasIDoing"]=="studying"){
    return "#94180d";
  } else if(dataPoint["whatWasIDoing"]=="in class"){
    return "#5d8a43";
  } else if(dataPoint["whatWasIDoing"]=="checking my phone"){
    return "#b34036";
  } else if(dataPoint["whatWasIDoing"]=="getting up"){
    return "#ffff00";
  }
}

function myL(dataPoint){
  if(dataPoint["location"] == "my room"){
    return "#ffd3cf";
  } else {
    return "#ffb700"
  }
}

function myMood(dataPoint){
  if(dataPoint["wasMyMoodAffectedByWhatISaw"] == "yes" && dataPoint["happyOrNot"] == "yes"){
    return "#1ddeb7";
  } else if(dataPoint["wasMyMoodAffectedByWhatISaw"] == "yes" && dataPoint["happyOrNot"] == "no"){
    return "#ff9900";
  } else if(dataPoint["wasMyMoodAffectedByWhatISaw"] == "no" && dataPoint["happyOrNot"] == "yes"){
    return "#6b4c1e";
  } else {
    return "black";
  }
}

// function skyColor(d, i){
//   if(d["skyColor"] == "white" || d["skyColor"] == "grey" || d["skyColor"] == "blue"){
//     return d["skyColor"];
//   } else if (d["skyColor"] == "dark grey"){
//     return "#2b2b2b";
//   } else if (d["skyColor"] == "light blue"){
//     return "#77aeba";
//   }
// }

let colorScale = d3.scaleOrdinal().domain(["white","light blue","blue","grey","dark grey"]).range(["white","#77aeba","blue","grey","#2b2b2b"]);
function skyColor(d,i){
  return colorScale(d.skyColor);
}


function anyCloud(d, i){
  if(d["anyCloud"] == "yes"){
    return 1.5;
  } else{
    return 0;
  }
}







function gotData(incomingData){
  console.log("new data is", incomingData);

  let sunnyShape = '<g class = "superShape"><path class="st0" d="M25.1,19.8c-8.4,0-15.2,6.8-15.2,15.2h30.5C40.3,26.6,33.5,19.8,25.1,19.8z"/><rect x="22.8" y="9.8" class="st0" width="4.4" height="7.1"/> <rect x="13.5" y="11.9" transform="matrix(0.9028 -0.4302 0.4302 0.9028 -5.1027 8.2666)" class="st0" width="4.4" height="7.1"/> <rect x="6" y="17.7" transform="matrix(0.6299 -0.7766 0.7766 0.6299 -13.5107 14.2619)" class="st0" width="4.4" height="7.1"/> <rect x="1.7" y="26.3" transform="matrix(0.2346 -0.9721 0.9721 0.2346 -26.0014 26.6979)" class="st0" width="4.4" height="7.1"/> <rect x="32.1" y="11.9" transform="matrix(0.905 0.4255 -0.4255 0.905 9.8187 -13.115)" class="st0" width="4.4" height="7.1"/> <rect x="39.5" y="17.7" transform="matrix(0.6379 0.7701 -0.7701 0.6379 31.4528 -24.4405)" class="st0" width="4.4" height="7.1"/> <rect x="43.8" y="26.1" transform="matrix(0.2496 0.9684 -0.9684 0.2496 63.2216 -22.2827)" class="st0" width="4.4" height="7.1"/> </g>'
  let cloudyShape = '<g class = "superShape"><path class="st0" d="M49.9,27.4c0-4.2-3.4-7.6-7.6-7.6c-0.6,0-1.3,0.1-1.9,0.2c-0.2-7.8-6.6-14-14.4-14c-6.7,0-12.3,4.5-13.9,10.7c-0.9-0.3-1.8-0.4-2.7-0.4c-5.2,0-9.3,4.2-9.3,9.3c0,5.2,4.2,9.3,9.3,9.3h35.1v-0.3C47.6,33.8,49.9,30.9,49.9,27.4z"/></g>'
  let rainyShape = '<g class = "superShape"><path class="st0" d="M46.2,20.7h-0.6c1.3-1.2,2.2-2.9,2.2-4.9c0-3.6-6.6-15.7-6.6-15.7s-6.6,12.1-6.6,15.7c0,1.9,0.9,3.7,2.2,4.9h-3.5c0.3-0.6,0.5-1.3,0.5-2c0-2.4-1.9-4.3-4.3-4.3H4.4c-2.4,0-4.3,1.9-4.3,4.3C0.1,21.1,2,23,4.4,23h12.8c-0.2,0.4-0.3,0.9-0.3,1.4c0,0.4,0.1,0.8,0.2,1.2h-4.6c-2.6,0-4.7,2.1-4.7,4.7c0,2.6,2.1,4.7,4.7,4.7H28c2.6,0,4.7-2.1,4.7-4.7c0-0.8-0.2-1.5-0.6-2.2h14.1c2,0,3.7-1.7,3.7-3.7C49.9,22.3,48.3,20.7,46.2,20.7z"/></g>'

  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
      .append("g")
        .attr("class", "datagroup")
  ;


  function weatherShape(d, i){
    if (d["weather"] == "sunny"){
      return sunnyShape;
    } else if(d["weather"] == "cloudy"){
      return cloudyShape;
    } else {
      return rainyShape;
    }
  }
  datagroups.html(weatherShape).select('.superShape')
    .attr("transform", "scale(1.5) translate(10, -40)")
    .attr("fill", skyColor)
  ;

  datagroups
      .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 100)
        .attr("height", 100)
        .attr("fill", "white")
        .style("opacity",light)
        .attr("class","lightInt")
  ;

  datagroups
      .append("rect")
        .attr("x", 52)
        .attr("y", 23)
        .attr("width", 24)
        .attr("height", 24)
        .attr("fill", doingW)
        .attr("class", "doingWhat")
  ;

  datagroups
      .append("rect")
        .attr("x", 52)
        .attr("y", 53)
        .attr("width", 24)
        .attr("height", 24)
        .attr("fill", myL)
        .attr("class", "myLocation")
  ;

  datagroups
      .append("rect")
        .attr("x", 24)
        .attr("y", 23)
        .attr("width", 24)
        .attr("height", 54)
        .attr("fill", myMood)
        .attr("class", "mood")
  ;

  datagroups
      .append("line")
        .attr("x1", 0)
        .attr("y1", 110)
        .attr("x2", 100)
        .attr("y2", 110)
        .attr("stroke-width", anyCloud)
        .attr("stroke", "black")
        .attr("class", "anyCloud")


  datagroups
      .append("text")
        .style("fill", "black")
        .style("font-size", 20)
        .attr("dy", 10)
        .attr("dx", 13)
        .attr("text-anchor", "middle")
        .attr("textLength", "40")
        .attr("font-family", "Rockwell")
        .text(detail)
        .attr("class", "textContent")
  ;


  function yPosition(d,i){
    if(i>=0 && i<12){
      return 150;
    } else if(i>11 && i<24){
      return 350;
    } else {
      return 550;
    }
  }
  function xPosition(d,i){
    if(i>=0 && i<12){
      return (w/36) * 2 * i + 420;
    } else if(i>11 && i<24){
      return (w/36) * 2 * i - 1180;
    } else{
      return (w/36) * 2 * i - 2780;
    }
  }
  function groupPosition(d, i){
    let x = xPosition(d,i);
    let y = yPosition(d,i);
    return "translate(" + x + "," + y + ")";
  }
  datagroups.attr("transform", groupPosition);




//time
  let dateObjectReturn = d3.timeFormat("%H:%M");
  function mapFunction(d,i){
    d.time = dateObjectReturn(new Date(d.time));
    return d;
  }
  let timeReturnedData = incomingData.map(mapFunction);
  console.log("timeAdjustedData", timeReturnedData);

  let dateConvert = d3.timeParse("%H:%M");
  function mapConverterFunction(d,i){
    d.time = dateConvert(d.time);
    return d;
  }
  let timeConvertedData = timeReturnedData.map(mapConverterFunction);
  console.log("convertedData", timeConvertedData);


  function findTime(d,i){
    return d.time;
  }
  let minTime = d3.min(timeConvertedData, findTime)
  console.log(minTime);
  let maxTime = d3.max(timeConvertedData, findTime)
  console.log(maxTime);
  let alternativeXDomain = d3.extent(timeConvertedData, findTime)
  console.log(alternativeXDomain);

  let xPadding = 50;
  let xScale = d3.scaleTime().domain(alternativeXDomain).range([0,w]);

  function cxPosition(d,i){
    return xScale(d.time);
  }

  // function cxPosition(){
  //   return Math.random() * 2400;
  // }
  function cyPosition(){
    return Math.random() * 800;
  }
  function radius(){
    return Math.random() * 100;
  }

  function circleColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  viz.selectAll(".time").data(incomingData).enter()
    .append("circle")
      .attr("class", "time")
      .attr("cx", cxPosition)
      .attr("cy", cyPosition)
      .attr("r", radius)
      .attr("fill", circleColor)
      .style("opacity", 0.7)
  ;

}

d3.json("data.json").then(gotData);
