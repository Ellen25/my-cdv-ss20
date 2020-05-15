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
let tooltipLayer = viz.append("g").attr("class", "tooltipLayer");




d3.json("countries.geojson").then(function(geoData){
  // d3.csv("Meteorite_Landings.csv").then(function(incomingData){
  d3.csv("Meteorite_Landings.csv").then(firstVizFunction);
  function firstVizFunction(incomingData){
    console.log(geoData);
    let projection = d3.geoEqualEarth()
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


    d3.shuffle(incomingData);
    incomingData = incomingData.slice(0,20000);





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
              datagroups.select("circle")
                .attr("fill", "white")
              ;
              d3.select(this).select("circle")
                .transition()
                .attr("fill", "orange")
                .attr("r", 10)
              ;
            })
            .on("click", function(d,i){
              console.log(this)
              console.log(d3.event)
              console.log(d3.mouse(viz.node()));
              let mouseInSVG = d3.mouse(viz.node());
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
                .attr("x", mouseInSVG[0]+40)
                .attr("y", mouseInSVG[1]-10)
              ;
              explanation2
                .text("Found Date: " + mTime)
                .attr("x", mouseInSVG[0]+40)
                .attr("y", mouseInSVG[1]+10)
              ;
              explanation3
                .text("Fell or Found: "+d.fall)
                .attr("x", mouseInSVG[0]+40)
                .attr("y", mouseInSVG[1]+30)
              ;
              explanation4
                .text("Mass: " + d.mass + "(g)")
                .attr("x", mouseInSVG[0]+40)
                .attr("y", mouseInSVG[1]+50)
              ;
            })
            .on("mouseout", function(d,i){
              datagroups.select("circle")
                .attr("fill", "white")
                .attr("r", 2)
              ;
              explanationDiv
                .attr("width", 0)
                .attr("height",0)
              ;
              explanation1.text("");
              explanation2.text("");
              explanation3.text("");
              explanation4.text("");
            })
          ;
    datagroups.append("circle")
      .attr("r", 2)
      .attr("fill", "white")
      .attr("class", "mPoint")
    ;



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
    graphGroup.selectAll(".datagroup").data(incomingData, assignKeys).exit().remove();

    // var brush = d3.brush()
    //   .extent( [ [0,0], [w,h] ] )
    //   .on("end", updateMap)
    // ;
    // graphGroup.append("g")
    //   .attr("class", "brush")
    //   .call(brush)
    // ;
    // var idleTimeout
    // function idled() { idleTimeout = null; }
    // function updateMap() {
    //    extent = d3.event.selection
    //    console.log(extent);
    //    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    //    if(!extent){
    //      if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
    //    }else{
    //      graphGroup.select(".brush").call(brush.move, null)
    //      console.log("zoom in")
    //      // var centroid = pathMaker.centroid(".brush");
    //      // var x,y;
    //      // x = centroid[0];
    //      // y = centroid[1];
    //      var p1,p2;
    //      p1 = d3.event.selection[0];
    //      p2 = d3.event.selection[1];
    //      var x,y;
    //      x = (p1[0]+p2[0])/2;
    //      y = (p1[1]+p2[1])/2;
    //      console.log("x", x, "y", y);
    //      mapLayer.selectAll(".countries").transition()
    //         .attr("transform", "translate(" + w/2 + "," + h/2 + ")scale(" + 2 + ")translate(" + -x + "," + -y + ")")
    //       ;
    //    }
    //    projection.translate([w/2, h/2]).scale(2);
    //    datagroups
    //       .attr("transform", function(d){
    //          let lat = d.reclat;
    //          let lon = d.reclong;
    //          let pixelvalue = projection([lon, lat]);
    //          return "translate("+ pixelvalue[0] +","+ pixelvalue[1] +")scale(2)";
    //        });
    //
    //
    //  }







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
        // graphGroup.select(".brush").call(brush.move, null)
        // mapLayer.transition()
        //  .attr("transform", "translate(0, 0)scale(" + 1 + ")");
        //exit most of them
        let exitingElements = currentElements.exit();
        console.log(exitingElements);
        exitingElements.remove();

        //update data
        // console.log(currentElements);
        // currentElements
          // .attr("fill", "orange")
          // .attr("r", 20)

        //enter new ones
        let meteoriteStories = currentElements.enter()
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
              .attr("fill", "orange")
              .attr("r", 30)
            ;
          })
          .on("click", function(d,i){
            d3.select(this).select("circle")
              .attr("fill", "white")
            ;
            console.log(this)
            let mouseInSVG = d3.mouse(viz.node());
            var story = document.getElementById("story");
            let storyContent = document.getElementById("storyContent");
            storyContent.innerText = "Name: " + d.name + "\n" + "\n" + d.discription + "\n";
            story.style.left = (w/2-200) +"px";
            story.style.top = -70 + "px";
          })
          .on("mouseout", function(d,i){
            d3.select(this).select("circle")
              .transition()
              .attr("r", 15)
            ;
          })
        meteoriteStories.append("circle")
          .attr("r", 15)
          .attr("fill", "orange")
          .attr("class", "mPoint")
        ;
      }



      enterView({
        selector:'#buttonnext',
        enter: function(el){
          console.log('a special element entered');
          d3.json("specific_meteorites.json").then(secondVizFunction);
          document.getElementById("scrollSign").innerHTML = "Scroll up and go back to the previous view";
          document.getElementById("note").innerHTML = "";
          document.getElementById("sideNote1").innerHTML = "Here are four stories behind some meteorite landings, which either shows the negative emotional effect brought up by a meteorite, or the scientific significance of a meteorite. We believe that a meteorite can bring us luck; we consider a meteorite as an omen. But the truth is that we are more likely to become Ann Hodges when encountering a meteorite, being so anxious because of getting a meteorite remain and becoming too famous due to the space rock. The additional meanings of a meteorite has added emotional burden to us. Therefore, it is necessary for us to objectively treat these splendid natural phenomenon.";
        },
      	exit: function(el) {
          console.log('a special element exited');
          d3.csv("Meteorite_Landings.csv").then(firstVizFunction);
          document.getElementById("scrollSign").innerHTML = "Scroll down for some detailed stories";
          document.getElementById("note").innerHTML = "Note: 'Fell' means the meteorite was traced when falling;'Found' means it was identified after falling and being recognized by the founder";
          document.getElementById("sideNote1").innerHTML = "It takes thousands of years for a meteorite to travel through the space that we do not know much about and come to Earth.The message they are carrying represents the past and the history of the whole space as well as the human beings as their birth can be traced back to the time the solar system was formed.";
      	},
      	progress: function(el, progress) {
          console.log("the special element's progress is:", progress);
      	},
        offset: 0.5
      });
      // enterView({
      //   selector:'#zoomIn',
      //   enter: function(el){
      //     var wholeMap = document.getElementById("container");
      //     var zoom = parseInt(wholeMap.style.zoom) + 10 +'%';
      //     wholeMap.style.zoom = zoom;
      //   },
      //   exit: function(el) {
      //     var wholeMap = document.getElementById("container");
      //     var zoom = parseInt(wholeMap.style.zoom) - 10 +'%'
      //     wholeMap.style.zoom = zoom;
      //   },
      //   progress: function(el, progress) {
      //     console.log("the special element's progress is:", progress);
      //   },
      //   offset: 0.5
      // });




  }//end of incomingdata function
})//end of geodata function



function removeStory(){
  document.getElementById("story").style.left = "-500px";
}
document.getElementById("closeButton").addEventListener("click", removeStory);
