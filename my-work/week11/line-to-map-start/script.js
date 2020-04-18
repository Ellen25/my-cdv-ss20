let w = 1200;
let h = 800;
let padding = 90

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;


// IMPORT DATA
d3.json("mainland.geojson").then(function(geoData){
  d3.csv("china-pop-2018.csv").then(function(incomingData){

  //get the min and max of population; scale them to a color range
  //to represent different province in different colors
    //turn the string into num (population is string)
    incomingData = incomingData.map(function(d,i){
      d.population = Number(d.population);
      return d;
    });
    console.log(incomingData);

    let minPop = d3.min(incomingData, function(d,i){
      return d.population;
    });
    console.log("minPop", minPop);
    let maxPop = d3.max(incomingData, function(d,i){
      return d.population;
    });
    console.log("maxPop", maxPop);

    //make a color scaler
    let colorScale = d3.scaleLinear().domain([minPop, maxPop]).range(["white", "#237d94"]);
    console.log(colorScale(20));


    // PRINT DATA
    console.log(geoData);

    // SCALES (to translate data values to pixel values)
    // let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
    // let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
    // let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
    // let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);




    let projection = d3.geoEqualEarth()//a projection from d3 library
      .translate([w/2, h/2])
      // .center([103.8,34.1])
      .fitExtent([[padding, padding], [w-padding, h-padding]], geoData);//fit the whole map to the page
      //[first point, second point], whichDataToPutInto

    // PATH (line) MAKER - gets points, returns one of those complicated looking path strings
    // let lineMaker = d3.line()
    //     .x(function(d){
    //       return xScale(Number(d.year));
    //     })
    //     .y(function(d){
    //       return yScale(Number(d.birthsPerThousand));
    //     })
    // ;
    let pathMaker = d3.geoPath(projection);

    // CREATE SHAPES ON THE PAGE!
    // viz.selectAll(".provinces").data(geoData.features).enter()
    //   .append("path")
    //     .attr("class", "provinces")
    //     .attr("d", pathMaker)
    //     .attr("fill", function(d,i){
    //       console.log(d.properties.name);
          //d.properties here = from mainland.geojson

//////////////////
          //see if d.properties.name is in incomingData (the population data)
    //       let correspondingDatapoint = incomingData.find(function(datapoint){
    //           // console.log(datapoint);
    //           //datapoint here is from china-pop csv
    //           if (datapoint.province == d.properties.name){
    //           return true;
    //         } else{
    //           return false;
    //         }
    //       });
    //       if(correspondingDatapoint != undefined){
    //         console.log(correspondingDatapoint);
    //         return colorScale(correspondingDatapoint.population);
    //       }else{
    //         return "grey";
    //       }
    //       if(d.properties.name == ""){//for each province, check whether it is in the other dataset
    //       return "black";}
    //     })
    //     .attr("stroke", "black")
    // ;


    // let lat = 31.22773;
    // let lon = 121.52946;
    // let pixelvalue = projection([lon,lat]);
    //
    // viz.append("circle")
    //   .attr("cx", pixelvalue[0])
    //   .attr("cy", pixelvalue[1])
    //   .attr("r", 20)
    //   .attr("fill", "red")
    // ;
    function randomColor(){
      return "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
    }
    viz.selectAll(".oneProvince").data(geoData.features).enter()
      .append("path")
        .attr("class", "oneProvince")
        .attr("d", pathMaker)
        .attr("stroke", "white")
        .attr("fill", function(d,i){
            if(d.properties.name == "Shanghai"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Zhejiang"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Henan"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Xizang"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Guizhou"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Sichuan"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Guangxi"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Xinjiang"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Qinghai"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Gansu"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Yunnan"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Hubei"){
              return randomColor();
            }
          })
        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
            if(d.properties.name == "Shandong"){
              return randomColor();
            }
          })


        .transition()
        .delay(1500)
        .attr("fill", function(d,i){
          console.log(d.properties.name);
          let correspondingDatapoint = incomingData.find(function(datapoint){
              // console.log(datapoint);
              //datapoint here is from china-pop csv
              if (datapoint.province == d.properties.name){
              return true;
            } else{
              return false;
            }
          });
          if(correspondingDatapoint != undefined){
            console.log(correspondingDatapoint);
            return colorScale(correspondingDatapoint.population);
          }else{
            return "grey";
          }
          if(d.properties.name == ""){//for each province, check whether it is in the other dataset
          return "black";}
        })
      ;



  });
});
