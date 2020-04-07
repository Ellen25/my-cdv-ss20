// just some console.logging at the start to make
// sure the script runs and we have data (from dataManager.js)
console.log("\n\n\nWelcome!\n\n\n");
console.log("script runs.");
console.log("do we have data?");
// check if variable exists: https://stackoverflow.com/a/519157
console.log("data:", typeof data!=='undefined'?data:"nothing here");
console.log(typeof data!=='undefined'?"seems like it ;-) it comes from the dataManager.js script.":"...damnit! let's see what is going wrong in the dataManager.js script.");

// global variables that we need at various spots:
let w = 800;
let h = 500;
let padding = 50;

// put the svg onto the page:
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
;






// X SCALE
// we use a band scale
//
// reference: https://github.com/d3/d3-scale#band-scales
// example: https://observablehq.com/@d3/d3-scaleband
//
// this is a useful scale when associating names (not values) with spots
// on the x axis. we don't map a range of values to another range of values,
// but a fixed set of names (the keys of our data points) to
// a range (pixel values along the x axis)
//
// first we need an array with the keys only:
let allNames = data.map(function(d){return d.key});
// check it:
console.log("all names", allNames);
// now we as d3 to give us our custom scale
// we say "hey d3, here is a list of names (keys (the domain)), I want a function that
// returns a number (pixel location on the x axis (the range)) for each of the names.
// oh, and could you make sure that this functions calculates in some
// distance (passingInner) between each of thos points (bands)?"
let xScale = d3.scaleBand()
    .domain(allNames)
    .range([padding, w-padding])
    .paddingInner(0.1)
;
// create a visual axis corresponding to the scale.
let xAxis = d3.axisBottom(xScale)
// this is a tricky one.... by default the axis would show the scales domain (the unique keys)
// ...in our case we want emojis to show. This situation hardly comes up,
// that's why I just wrote this one-liner for you:
xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
// create a group to hold all the axis elements
let xAxisGroup = viz.append("g").classed("xAxis", true);
// tell d3 to put the axis into place
xAxisGroup.call(xAxis);
// modfy the axis label (the emoojis) size
xAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
// get rid of the little tick lines
xAxisGroup.selectAll("line").remove();
// bring axis to the correct y position
xAxisGroup.attr("transform", "translate(0,"+ (h-padding) +")")





// Y SCALE
// we will not show a y axis in this graph, but still need a scale
// to make sure our bars have heights that fit the window. It's
// familiar linear scale.
let yMax = d3.max(data, function(d){return d.value});
// I decided not to use the minimum value of the dataset,
// because otherwise the smallest value's bar would always be 0 pixels
// high and therefore invisible.
yDomain = [0, yMax];
// "hey d3 i need a linear scale please. yeah! I want to supply a value
// to it that is between 0 and yMax and want one back that fits between
// my graph's paddings. Cheers!"
let yScale = d3.scaleLinear().domain(yDomain).range([0, h-padding*2]);








// the ACTUAL GRAPH
// before we get to the actual graph, we make a group element into which to
// put all visual graph things:
let graphGroup = viz.append("g").classed("graphGroup", true);
// btw, this:
// .classed("graphGroup", true);
// is almost equivalent to
// .attr("class", "graphGroup");
// but slightly more advanced. you can find a description here:
// https://github.com/d3/d3-selection#selection_classed






// now comes the interesting part, WATCH OUT! i'll go slow
// we have the page (with nothing on it) and we have data
// we *toss* it both to D3 and let it do its evaluation about
// how many elements need to enter/update/exit.
let elementsForPage = graphGroup.selectAll(".datapoint").data(data);
// note, we do not use ".enter()" for now. let's have a close look
// at just this (the situation) for now
// as we have learned, D3 did some kind of calculation here, some weighing
// of what is on the page already and what needs to go there.
// have a close look at this console.log:
console.log("D3's assessment of whats needed on the page:", elementsForPage);
// note the reference to enter, exit and group in the object
// those three are all the possible selections.
// they comprises elements that are about to enter (in this case 10),
// elements that are on the page already and will be updated and elements
// that don't have any associated datapoint anymore and need to exit.
// out of this, we can pick those three subsections and decide
// precisely what to do with the, e.g. how should new elements enter?
// should they come from the bottom? slowly fade in? - ours to decide
// how should updating elements change their size, color, position etc.?
// and the exiting ones, rather than just disappearing, how about they
// fade out?





// out of this, we will now extract the sub selections,
// the entering elements and the exiting ones:
let enteringElements = elementsForPage.enter();
let exitingElements = elementsForPage.exit();
// and again, look closely:
console.log("enteringElements", enteringElements);
console.log("exitingElements", exitingElements);
// note how we now only deal with a "_groups" thing,
// in the enteringElements object, the "_groups" array holds the
// empty placeholder elements for the elements that are about to enter
// equally, in the exitingElements, the "_groups" array holds the elements
// that ARE on the page, but must leave because no datapoint is their to
// match them.
// here is how i see it, we start with the full situation - all the elements
// that we are dealing with. from that, we extract the entering ones (... and
// do something with them), we also extract the exiting one (...and treat those
// differently, too) and then? What are we left with? the UPDATING elements!
// they are in the "_groups" array we saw in the very beginning inside
// "elementsForPage". For now, hold the thought that we are dealing
// with three subsections of elements: entering ones, exiting ones, and updating ones.
// hopefully this will get clearer as we go on.






// as you can see, there is nothing on the page yet. And the previous console.logs
// confirm that there is no elements updating, none are leaving, we only have things enter.
// let's deal with them right now:
// make a group for each datapoint
let enteringDataGroups = enteringElements.append("g").classed("datapoint", true);
// position the group along the x axis (check the inspector tool to see
// what we are doing):
enteringDataGroups.attr("transform", function(d, i){
  return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
});
// then append rectangles to them and position/size them:
enteringDataGroups
  .append("rect")
    .attr("width", function(){
      // the scaleBand we are using
      // allows us to as how thick each band is:
      return xScale.bandwidth();
    })
    .attr("height", function(d, i){
      // the idea is that we make the bar
      // as high as dictated by the value...
      return yScale(d.value);
    })
    .attr("y", function(d,i){
      // ...and then push the bar up since it
      // is drawn from top to bottom
      return -yScale(d.value);
    })
    .attr("fill", "black")
;






// binding functions to the buttons on the page
// the functions we use to do the actual work are defined in dataManager.js
function add(){
  addDatapoints(1);
  //update scales
  console.log("new data added", data);
  allNames = data.map(function(d){return d.key});
  //update x scale
  xScale.domain(allNames);
  xAxis = d3.axisBottom(xScale);
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
  xAxisGroup.transition().delay(1000).call(xAxis).selectAll("text").attr("font-size", 18);
  xAxisGroup.selectAll("line").remove();
  //y scale
  yMax = d3.max(data, function(d){return d.value});
  yDomain = [0, yMax+yMax*0.1];
  yScale.domain(yDomain);

  function assignKeys(d,i){
        return d.key;
      }
  elementsForPage = graphGroup.selectAll(".datapoint").data(data, assignKeys);
  console.log("elementsForPage", elementsForPage);

  enteringElements = elementsForPage.enter();
  elementsForPage.transition().duration(1500).attr("transform", function(d,i){
    return("translate("+xScale(d.key)+","+(h-padding)+")")
  });
  elementsForPage.select("rect")
     .transition()
     .delay(1000)
     .duration(500)
     .attr("width", function(){
        return xScale.bandwidth();
     })
     .attr("y", function(d,i){
       return -yScale(d.value);
     })
     .attr("height", function(d, i){
       return yScale(d.value);
     });
  //entering new data
    let incomingDataGroups = enteringElements
      .append("g")
        .classed("datapoint", true)
    ;
    incomingDataGroups.attr("transform", function(d, i){
      return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
    });
    incomingDataGroups
      .append("rect")
        .attr("y", function(d,i){
          return 0;
        })
        .attr("height", function(d,i){
          return 0;
        })
        .attr("fill", "#b30030")
        .attr("width", function(){
          return xScale.bandwidth();
        })
        .transition()
        .delay(600)
        .duration(1000)
        .attr("y", function(d,i){
          return -yScale(d.value);
        })
        .attr("height", function(d, i){
          return yScale(d.value);
        })
        .attr("fill", "#e39daf")
     ;
}
document.getElementById("buttonA").addEventListener("click", add);

function remove(){
  removeDatapoints(1);
  //update scales
  console.log("new data after removing", data);
  allNames = data.map(function(d){return d.key});
  //update x scale
  xScale.domain(allNames);
  xAxis = d3.axisBottom(xScale);
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
  xAxisGroup.transition().delay(1000).call(xAxis).selectAll("text").attr("font-size", 18);
  xAxisGroup.selectAll("line").remove();
  //y scale
  yMax = d3.max(data, function(d){return d.value});
  yDomain = [0, yMax+yMax*0.1];
  yScale.domain(yDomain);

  function assignKeys(d,i){
        return d.key;
      }
  elementsForPage = graphGroup.selectAll(".datapoint").data(data, assignKeys);
  console.log("elementsForPage", elementsForPage);

  exitingElements = elementsForPage.exit();
  exitingElements.select("rect")
    .attr("fill", "#91cc8b")
    .transition()
    .duration(500)
    .attr("y", function(d,i){
      return 0;
    })
    .attr("height", function(d, i){
      return 0;
    })
  exitingElements.transition().delay(1000).remove();

  elementsForPage.transition().duration(1500).attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });
  elementsForPage.select("rect")
   .transition()
   .delay(1000)
   .duration(500)
   .attr("width", function(){
      return xScale.bandwidth();
   })
   .attr("y", function(d,i){
     return -yScale(d.value);
   })
   .attr("height", function(d, i){
     return yScale(d.value);
   })
  ;
}
document.getElementById("buttonB").addEventListener("click", remove);

function removeAndAdd(){
  removeAndAddDatapoints(1,1);
  //update scales
  console.log("new data remove+enter", data);
  allNames = data.map(function(d){return d.key});
  //update x scale
  xScale.domain(allNames);
  xAxis = d3.axisBottom(xScale);
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
  xAxisGroup.transition().delay(1000).call(xAxis).selectAll("text").attr("font-size", 18);
  xAxisGroup.selectAll("line").remove();
  //y scale
  yMax = d3.max(data, function(d){return d.value});
  yDomain = [0, yMax+yMax*0.1];
  yScale.domain(yDomain);
  //asign key to the data
  function assignKeys(d,i){
        return d.key;
      }
  elementsForPage = graphGroup.selectAll(".datapoint").data(data, assignKeys);
  console.log("elementsForPage", elementsForPage);

  enteringElements = elementsForPage.enter();
  exitingElements = elementsForPage.exit();

  //removing elements
  exitingElements = elementsForPage.exit();
  exitingElements.select("rect")
    .attr("fill", "#91cc8b")
    .transition()
    .duration(500)
    .attr("y", function(d,i){
      return 0;
    })
    .attr("height", function(d, i){
      return 0;
    })
  exitingElements.transition().duration(1500).remove();

  //updating elements
  elementsForPage.transition().duration(2500).attr("transform", function(d,i){
    return("translate("+xScale(d.key)+","+(h-padding)+")")
  });
  elementsForPage.select("rect")
     .transition()
     .delay(1500)
     .duration(2000)
     .attr("width", function(){
        return xScale.bandwidth();
     })
     .attr("y", function(d,i){
       return -yScale(d.value);
     })
     .attr("height", function(d, i){
       return yScale(d.value);
     });

    //entering elements
    incomingDataGroups = enteringElements
      .append("g")
        .classed("datapoint", true)
    ;
    incomingDataGroups.attr("transform", function(d, i){
      return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
    });
    incomingDataGroups
      .append("rect")
        .attr("y", function(d,i){
          return 0;
        })
        .attr("height", function(d,i){
          return 0;
        })
        .attr("fill", "#b30030")
        .attr("width", function(){
          return xScale.bandwidth();
        })
        .transition()
        .delay(2000)
        .duration(1000)
        .attr("y", function(d,i){
          return -yScale(d.value);
        })
        .attr("height", function(d, i){
          return yScale(d.value);
        })
        .attr("fill", "#e39daf")
     ;
}
document.getElementById("buttonC").addEventListener("click", removeAndAdd);


function sortData(){
  sortDatapoints();
  //update scales
  console.log("new data sorted", data);
  allNames = data.map(function(d){return d.key});
  //update x scale
  xScale.domain(allNames);
  xAxis = d3.axisBottom(xScale);
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
  xAxisGroup.transition().delay(1000).call(xAxis).selectAll("text").attr("font-size", 18);
  xAxisGroup.selectAll("line").remove();
  //y scale
  yMax = d3.max(data, function(d){return d.value});
  yDomain = [0, yMax+yMax*0.1];
  yScale.domain(yDomain);

  function assignKeys(d,i){
        return d.key;
      }
  elementsForPage = graphGroup.selectAll(".datapoint").data(data,assignKeys);
  console.log("elementsForPage", elementsForPage);

  elementsForPage.transition().duration(2500).attr("transform", function(d,i){
    return("translate("+xScale(d.key)+","+(h-padding)+")")
  });
  elementsForPage.select("rect")
     .transition()
     .delay(500)
     .duration(1000)
     .attr("width", function(){
        return xScale.bandwidth();
     })
     .attr("y", function(d,i){
       return -yScale(d.value);
     })
     .attr("height", function(d, i){
       return yScale(d.value);
     });
}
document.getElementById("buttonD").addEventListener("click", sortData);

function shuffleData(){
  shuffleDatapoints();
  //update scales
  console.log("new data sorted", data);
  allNames = data.map(function(d){return d.key});
  //update x scale
  xScale.domain(allNames);
  xAxis = d3.axisBottom(xScale);
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
  xAxisGroup.transition().delay(1000).call(xAxis).selectAll("text").attr("font-size", 18);
  xAxisGroup.selectAll("line").remove();
  //y scale
  yMax = d3.max(data, function(d){return d.value});
  yDomain = [0, yMax+yMax*0.1];
  yScale.domain(yDomain);

  function assignKeys(d,i){
        return d.key;
      }
  elementsForPage = graphGroup.selectAll(".datapoint").data(data, assignKeys);
  console.log("elementsForPage", elementsForPage);

  elementsForPage.transition().duration(2500).attr("transform", function(d,i){
    return("translate("+xScale(d.key)+","+(h-padding)+")")
  });
  elementsForPage.select("rect")
     .transition()
     .delay(500)
     .duration(1000)
     .attr("width", function(){
        return xScale.bandwidth();
     })
     .attr("y", function(d,i){
       return -yScale(d.value);
     })
     .attr("height", function(d, i){
       return yScale(d.value);
     });
}
document.getElementById("buttonE").addEventListener("click", shuffleData);


function empty(){
  removeDatapoints(data.length);
  //update scales
  console.log("new data now", data);
  allNames = data.map(function(d){return d.key});
  //update x scale
  xScale.domain(allNames);
  xAxis = d3.axisBottom(xScale);
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
  xAxisGroup.transition().delay(1000).call(xAxis).selectAll("text").attr("font-size", 18);
  xAxisGroup.selectAll("line").remove();
  //y scale
  yMax = d3.max(data, function(d){return d.value});
  yDomain = [0, yMax+yMax*0.1];
  yScale.domain(yDomain);

  function assignKeys(d,i){
        return d.key;
      }
  elementsForPage = graphGroup.selectAll(".datapoint").data(data, assignKeys);
  console.log("elementsForPage", elementsForPage);

  exitingElements = elementsForPage.exit();
  exitingElements.select("rect")
    .attr("fill", "#91cc8b")
    .transition()
    .duration(500)
    .attr("y", function(d,i){
      return 0;
    })
    .attr("height", function(d, i){
      return 0;
    })
  exitingElements.transition().delay(1000).remove();

  elementsForPage.transition().duration(1500).attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });
  elementsForPage.select("rect")
   .transition()
   .delay(1000)
   .duration(500)
   .attr("width", function(){
      return xScale.bandwidth();
   })
   .attr("y", function(d,i){
     return -yScale(d.value);
   })
   .attr("height", function(d, i){
     return yScale(d.value);
   })
  ;
}
document.getElementById("buttonF").addEventListener("click", empty);
