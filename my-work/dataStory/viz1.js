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
let mapLayer = viz.append("g").attr("class", "mapLayer");
let graphGroup = viz.append("g").attr("class", "graphGroup");
let tooltipLayer = viz.append("g").attr("class", "tooltipPlayer");




d3.json("countries.geojson").then(function(geoData){
  d3.csv("Meteorite_Landings.csv").then(function(incomingData){
    console.log(geoData);
    let projection = d3.geoEqualEarth()//a projection from d3 library
      .translate([w, h])
      .fitExtent([[0, 0], [w-100, h]], geoData);
    let pathMaker = d3.geoPath(projection);
    mapLayer.selectAll(".countries").data(geoData.features).enter()
      .append("path")
        .attr("d", pathMaker)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("class", "countries")
    ;

    // let explanation3 = viz.selectAll(".fallExplanation").data(incomingData).enter()
    //   .append("text")
    //   .attr("fill", "red")
    //   .attr("class", "fallExplanation")
    // ;



    // d3.shuffle(incomingData);
    // incomingData = incomingData.slice(0,20000);





    console.log("meteorite landings", incomingData);
    console.log("geolocation", incomingData[0].GeoLocation);


    let parseTime = d3.timeParse("%B %d, %Y");
    let parsed = parseTime(incomingData.year);
    let formatTime = d3.timeFormat("%B %d, %Y");
    let mTime = formatTime(parsed);

    function assignKeys(d,i){
      return d.name;
    }
    let datagroups = graphGroup.selectAll(".datagroup").data(incomingData, assignKeys).enter()
          .append("g")
            .attr("class", "datagroup")
            .attr("transform", function(d){
              let lat = d.reclat;
              let lon = d.reclong;
              let pixelvalue = projection([lon, lat]);
              return "translate("+ pixelvalue[0] +","+ pixelvalue[1] +")";
            })
            .on("mouseover", function(d,i){
              d3.select(this).select("circle")
                .transition()
                // .attr("r", 20)
                .attr("fill", "orange")
              ;
            })
            .on("click", function(d,i){
              console.log(this)
              console.log(d3.event)
              console.log(d3.mouse(viz.node()));
              let mouseInSVG = d3.mouse(viz.node());
              // var explanation = document.getElementById("explanation");
              // var content = document.createElement("P");
              // content.innerText = "Name: " + d.name +"\n Found Data: " +  mTime + "\n Fell or Found: " + d.fall +"\n Mass: " + d.mass + "(g)";
              // explanation.innerHTML = "";
              // explanation.appendChild(content);
              // explanation.style.backgroundColor = "orange";
              // explanation.style.left = mouseInSVG[0] + "px";
              // explanation.style.top = mouseInSVG[1] + "px";

              explanationDiv
                .attr("x", mouseInSVG[0]+30)
                .attr("y", mouseInSVG[1]-40)
                .attr("width", 270)
                .attr("height", 110)
                .attr("fill", "orange")
                .attr("opacity", 0.9)
              ;
              explanation1
                .text("Name: " + d.name)
                .attr("font-family", "Rockwell")
                .attr("x", mouseInSVG[0]+40)
                .attr("y", mouseInSVG[1]-10)
              ;
              explanation2
                .text("Found Date: " + mTime)
                .attr("font-family", "Rockwell")
                .attr("x", mouseInSVG[0]+40)
                .attr("y", mouseInSVG[1]+10)
              ;
              explanation3
                // .text(function(d,i){
                  // if(d.fall == "Fell"){
                  //   return d.fall +": It was seen to fall from the sky at first and was tracked down successfully.";
                  // } else{
                  //   return d.fall +": It was found on the ground due to the finder recognizing it.";
                  // }
                  // console.log("d is " + d);
                // })
                .text("Fell or Found: "+d.fall)
                .attr("font-family", "Rockwell")
                .attr("x", mouseInSVG[0]+40)
                .attr("y", mouseInSVG[1]+30)
              ;
              explanation4
                .text("Mass: " + d.mass + "(g)")
                .attr("font-family", "Rockwell")
                .attr("x", mouseInSVG[0]+40)
                .attr("y", mouseInSVG[1]+50)
              ;
            })
            .on("mouseout", function(d,i){
              explanationDiv
                .attr("width", 0)
                .attr("height",0)
              ;
              explanation1.text("");
              explanation2.text("");
              explanation3.text("");
              explanation4.text("");
              d3.select(this).select("circle")
                .attr("r", 2)
                .attr("fill", "white")
              ;
              // var explanation = document.getElementById("explanation");
              // explanation.style.left = "-500px";
              // explanation.style.width = 0;
              // explanation.style.height = 0;
              // content.innerText = "";
            })
          ;
    datagroups.append("circle")
      .attr("r", 2)
      .attr("fill", "white")
      .attr("class", "mPoint")
    ;

    // function expText(incomingData){
    //   // if (d.fall== "Fell"){
    //   //   return d.name + " was found at " + mTime + ". It was seen to fall from the sky at first and was tracked down successfully.";
    //   // } else {
    //   //   return d.name + " was found at " + mTime + ". It was found on the ground due to the finder recognizing it.";
    //   // }
    //   console.log("d is "+ incomingData);
    //   return "AAAAAAAAAAA";
    // }



    let explanationDiv = tooltipLayer.append("rect")
      .attr("x", 2)
      .attr("y", 2)
    ;
    let explanation1 = tooltipLayer.append("text")
      .attr("fill", "white")
      .attr("class", "explanation")
    ;
    let explanation2 = tooltipLayer.append("text")
      .attr("fill", "white")
      .attr("class", "explanation")
    ;
    let explanation3 = tooltipLayer.append("text")
      .attr("fill", "white")
      .attr("class", "explanation")
    ;
    let explanation4 = tooltipLayer.append("text")
      .attr("fill", "white")
      .attr("class", "explanation")
    ;









      // let emptyData = [];
      function secondVizFunction(specificData){
        let storyDiv = tooltipLayer.append("g");
        let storybg = storyDiv.append("rect");
        let story1 = storyDiv.append("text")
          .attr("fill", "white")
          .attr("class", "story")
        ;
        let story2 = storyDiv.append("text")
          .attr("fill", "white")
          .attr("class", "story")
        ;

        console.log("function called");
        //get current elements
        function assignKeys(d,i){
          return d.name;
        }
        let currentElements = graphGroup.selectAll(".datagroup").data(specificData, assignKeys);
        currentElements.select("circle")
          .attr("r", 15)
          .attr("fill", "orange")
        ;
        //exit most of them
        let exitingElements = currentElements.exit();
        console.log(exitingElements);
        exitingElements.remove();
        //update data
        console.log(currentElements);
        currentElements
          // .attr("fill", "orange")
          // .attr("r", 20)
          .on("mouseover", function(d,i){
            d3.select(this).select("circle")
              .transition()
              .attr("r", 30)
              .attr("fill", "white")
            ;
          })
          .on("click", function(d,i){
            console.log(this)
            let mouseInSVG = d3.mouse(viz.node());
            var story = document.getElementById("story");
            var storyContent = document.createElement("P");
            storyContent.setAttribute("id", "storyContent");
            storyContent.innerText = "Name: " + d.name + "\n" + "\n" + d.discription;
            story.innerHTML = "";
            story.appendChild(storyContent);
            story.style.backgroundColor = "orange";
            story.style.left = (w/2-200) +"px";
            story.style.top = (h/2-100) + "px";
            // explanationDiv
            //   .attr("width", 0)
            //   .attr("height", 0)
            // ;
            // explanation1.text(d.discription);
            // explanation2.text("");
            // explanation3.text("");
            // explanation4.text("");
            // storyDiv
            //   .attr("transfrom", "translate(500, 200)")
            // ;
            // storybg
            //   .attr("x", 0)
            //   .attr("y", 0)
            //   .attr("height", 200)
            //   .attr("width", 300)
            // ;
            // story1
            //   .attr("text", d.discription)
            //   .attr("x", 10)
            //   .attr("y", 10)
            // ;
          })
          .on("mouseout", function(d,i){
            d3.select(this).select("circle")
              .attr("r", 15)
            ;
            // explanationDiv
            //   .attr("width", 0)
            //   .attr("height", 0)
            // ;
            // explanation1.text("");
            // explanation2.text("");
            // explanation3.text("");
            // explanation4.text("");
          })
      }

      document.getElementById("buttonnext").addEventListener("click", function(){
        console.log("clicked");
        d3.json("specific_meteorites.json").then(secondVizFunction);
      })








  })//end of incomingdata function
})//end of geodata function



function removeStory(){
  document.getElementById("story").style.left = "-500px";
}
document.getElementById("closeButton").addEventListener("click", removeStory);
