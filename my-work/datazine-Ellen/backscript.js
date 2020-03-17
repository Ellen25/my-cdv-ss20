console.log("js loaded");
let w = 1200;
let h = 800;
let sunnyShape = '<g class = "superShape"><path class="st0" d="M25.1,19.8c-8.4,0-15.2,6.8-15.2,15.2h30.5C40.3,26.6,33.5,19.8,25.1,19.8z"/><rect x="22.8" y="9.8" class="st0" width="4.4" height="7.1"/> <rect x="13.5" y="11.9" transform="matrix(0.9028 -0.4302 0.4302 0.9028 -5.1027 8.2666)" class="st0" width="4.4" height="7.1"/> <rect x="6" y="17.7" transform="matrix(0.6299 -0.7766 0.7766 0.6299 -13.5107 14.2619)" class="st0" width="4.4" height="7.1"/> <rect x="1.7" y="26.3" transform="matrix(0.2346 -0.9721 0.9721 0.2346 -26.0014 26.6979)" class="st0" width="4.4" height="7.1"/> <rect x="32.1" y="11.9" transform="matrix(0.905 0.4255 -0.4255 0.905 9.8187 -13.115)" class="st0" width="4.4" height="7.1"/> <rect x="39.5" y="17.7" transform="matrix(0.6379 0.7701 -0.7701 0.6379 31.4528 -24.4405)" class="st0" width="4.4" height="7.1"/> <rect x="43.8" y="26.1" transform="matrix(0.2496 0.9684 -0.9684 0.2496 63.2216 -22.2827)" class="st0" width="4.4" height="7.1"/> </g>'


let viz = d3.select("#container")
  .append("svg")
    .style("background-color", "#a5c9c8")
    .attr("width", w)
    .attr("height", h)
;


let datagroup = viz
  .append("g")
    .attr("class", "datagroup")
    .attr("transform", "translate(150,300)")
;

datagroup
  .html(sunnyShape).select('.superShape')
    .attr("transform", "scale(6) translate(0, -37)")
    .attr("fill", "#77aeba")
;
datagroup
  .append("text")
    .style("fill", "black")
    .style("font-size", 30)
    .attr("dy", -35)
    .attr("dx", 150)
    .attr("text-anchor", "middle")
    .attr("font-family", "Rockwell")
    .text("A")
    .attr("class", "A")
;

datagroup
  .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "white")
    .attr("width", 300)
    .attr("height", 300)
    .style("opacity", 0.7)
    .attr("class", "background")
;
datagroup
  .append("text")
    .style("fill", "black")
    .style("font-size", 30)
    .attr("dy", 150)
    .attr("dx", 330)
    .attr("text-anchor", "middle")
    .attr("font-family", "Rockwell")
    .text("B")
    .attr("class", "B")
;

datagroup
  .append("rect")
    .attr("x", 69)
    .attr("y", 69)
    .attr("fill", "#1ddeb7")
    .attr("width", 72)
    .attr("height", 162)
    .attr("class", "left")
;
datagroup
  .append("text")
    .style("fill", "black")
    .style("font-size", 30)
    .attr("dy", 160)
    .attr("dx", 105)
    .attr("text-anchor", "middle")
    .attr("font-family", "Rockwell")
    .text("D")
    .attr("class", "D")
;

datagroup
  .append("rect")
    .attr("x", 159)
    .attr("y", 69)
    .attr("fill", "#94180d")
    .attr("width", 72)
    .attr("height", 72)
    .attr("class", "upRight")
;
datagroup
  .append("text")
    .style("fill", "black")
    .style("font-size", 30)
    .attr("dy", 117)
    .attr("dx", 195)
    .attr("text-anchor", "middle")
    .attr("font-family", "Rockwell")
    .text("E")
    .attr("class", "E")
;

datagroup
  .append("rect")
    .attr("x", 159)
    .attr("y", 159)
    .attr("fill", "#ffb700")
    .attr("width", 72)
    .attr("height", 72)
    .attr("class", "downRight")
;
datagroup
  .append("text")
    .style("fill", "black")
    .style("font-size", 30)
    .attr("dy", 210)
    .attr("dx", 195)
    .attr("text-anchor", "middle")
    .attr("font-family", "Rockwell")
    .text("F")
    .attr("class", "F")
;

datagroup
  .append("line")
    .attr("x1", 0)
    .attr("y1", 315)
    .attr("x2", 300)
    .attr("y2", 315)
    .attr("stroke-width", 4)
    .attr("stroke", "black")
;
datagroup
  .append("text")
    .style("fill", "black")
    .style("font-size", 30)
    .attr("dy", 325)
    .attr("dx", 330)
    .attr("text-anchor", "middle")
    .attr("font-family", "Rockwell")
    .text("C")
    .attr("class", "C")
;
datagroup
  .append("text")
    .style("fill", "black")
    .style("font-size", 30)
    .attr("dy", 10)
    .attr("dx", 0)
    .attr("text-anchor", "middle")
    .attr("font-family", "Rockwell")
    .text("G")
    .attr("class", "G")
;


let instruction = viz
  .append("g")
    .attr("class", "instruction")
    .attr("transform", "translate(650, 100)")

instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 30)
    .attr("dy", 0)
    .attr("dx", 0)
    .attr("text-anchor", "middle")
    .attr("font-family", "Rockwell")
    .text("How to Read")
    .attr("class", "title")
;

instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 25)
    .attr("dy", 50)
    .attr("dx", -50)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("A: Shape = Weather; Color = Sky color")
;

//part B
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 25)
    .attr("dy", 80)
    .attr("dx", -50)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("B: Opacity = Light intensity")
;
instruction
  .append("rect")
    .attr("x", -10)
    .attr("y", 90)
    .attr("fill", "white")
    .attr("width", 30)
    .attr("height", 30)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 113)
    .attr("dx", 20)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("High intensity")
;
instruction
  .append("rect")
    .attr("x", 200)
    .attr("y", 90)
    .attr("fill", "white")
    .attr("width", 30)
    .attr("height", 30)
    .style("opacity", 0.2)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 113)
    .attr("dx", 230)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("Low intensity")
;


instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 25)
    .attr("dy", 150)
    .attr("dx", -50)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("C: Any cloud in the sky or not")
;

//part D
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 25)
    .attr("dy", 180)
    .attr("dx", -50)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("D: How is my mood")
;
instruction
  .append("rect")
    .attr("x", -10)
    .attr("y", 190)
    .attr("fill", "#1ddeb7")
    .attr("width", 30)
    .attr("height", 30)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 213)
    .attr("dx", 20)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("Mood affected & happy")
;
instruction
  .append("rect")
    .attr("x", -10)
    .attr("y", 220)
    .attr("fill", "#ff9900")
    .attr("width", 30)
    .attr("height", 30)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 245)
    .attr("dx", 20)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("Mood unaffected & happy")
;
instruction
  .append("rect")
    .attr("x", -10)
    .attr("y", 250)
    .attr("fill", "#6b4c1e")
    .attr("width", 30)
    .attr("height", 30)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 275)
    .attr("dx", 20)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("Mood affected & unhappy")
;
instruction
  .append("rect")
    .attr("x", -10)
    .attr("y", 280)
    .attr("fill", "black")
    .attr("width", 30)
    .attr("height", 30)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 305)
    .attr("dx", 20)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("Mood affected & unhappy")
;

//part E
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 25)
    .attr("dy", 340)
    .attr("dx", -50)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("E: What am I doing")
instruction
  .append("rect")
    .attr("x", -10)
    .attr("y", 345)
    .attr("fill", "#94180d")
    .attr("width", 30)
    .attr("height", 30)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 370)
    .attr("dx", 20)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("Studying")
;
instruction
  .append("rect")
    .attr("x", -10)
    .attr("y", 375)
    .attr("fill", "#b34036")
    .attr("width", 30)
    .attr("height", 30)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 400)
    .attr("dx", 20)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("Checking my phone")
;
instruction
  .append("rect")
    .attr("x", -10)
    .attr("y", 405)
    .attr("fill", "#ffff00")
    .attr("width", 30)
    .attr("height", 30)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 430)
    .attr("dx", 20)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("Getting up")
;
instruction
  .append("rect")
    .attr("x", -10)
    .attr("y", 435)
    .attr("fill", "#5d8a43")
    .attr("width", 30)
    .attr("height", 30)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 460)
    .attr("dx", 20)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("In class")
;

//part F
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 25)
    .attr("dy", 490)
    .attr("dx", -50)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("F: My location")
;
instruction
  .append("rect")
    .attr("x", -10)
    .attr("y", 495)
    .attr("fill", "#ffd3cf")
    .attr("width", 30)
    .attr("height", 30)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 520)
    .attr("dx", 20)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("My room")
;
instruction
  .append("rect")
    .attr("x", -10)
    .attr("y", 525)
    .attr("fill", "#ffb700")
    .attr("width", 30)
    .attr("height", 30)
;
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 22)
    .attr("dy", 550)
    .attr("dx", 20)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("Dining room")
;

//part G
instruction
  .append("text")
    .style("fill", "black")
    .style("font-size", 25)
    .attr("dy", 580)
    .attr("dx", -50)
    .attr("text-anchor", "start")
    .attr("font-family", "Rockwell")
    .text("G: Date")
;
