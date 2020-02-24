console.log("hi");

let data = [
      {
          "timestamp": "2020-02-19T10:16:33.577Z",
          "annoyingKids": 8,
          "peopleWhoPostYourWorstPictureToSocialMedia": 4,
          "greenPepper": 1,
          "studying": 1,
          "joker": 9,
          "beingInATinyLittleSpace": 1,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 1
      },
      {
          "timestamp": "2020-02-19T10:17:34.820Z",
          "annoyingKids": 10,
          "peopleWhoPostYourWorstPictureToSocialMedia": 10,
          "greenPepper": 2,
          "studying": 8,
          "joker": 5,
          "beingInATinyLittleSpace": 4,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 4
      },
      {
          "timestamp": "2020-02-19T10:32:27.815Z",
          "annoyingKids": 10,
          "peopleWhoPostYourWorstPictureToSocialMedia": 8,
          "greenPepper": 3,
          "studying": 6,
          "joker": 5,
          "beingInATinyLittleSpace": 3,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 10
      },
      {
          "timestamp": "2020-02-19T10:32:47.096Z",
          "annoyingKids": 10,
          "peopleWhoPostYourWorstPictureToSocialMedia": 8,
          "greenPepper": 1,
          "studying": 7,
          "joker": 1,
          "beingInATinyLittleSpace": 10,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 5
      },
      {
          "timestamp": "2020-02-19T10:37:07.930Z",
          "annoyingKids": 8,
          "peopleWhoPostYourWorstPictureToSocialMedia": 9,
          "greenPepper": 1,
          "studying": 7,
          "joker": 4,
          "beingInATinyLittleSpace": 7,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 2
      },
      {
          "timestamp": "2020-02-19T10:39:37.427Z",
          "annoyingKids": 8,
          "peopleWhoPostYourWorstPictureToSocialMedia": 10,
          "greenPepper": 1,
          "studying": 5,
          "joker": 3,
          "beingInATinyLittleSpace": 3,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 1
      },
      {
          "timestamp": "2020-02-19T10:42:20.020Z",
          "annoyingKids": 10,
          "peopleWhoPostYourWorstPictureToSocialMedia": 5,
          "greenPepper": 1,
          "studying": 7,
          "joker": 8,
          "beingInATinyLittleSpace": 4,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 7
      },
      {
          "timestamp": "2020-02-19T10:54:48.461Z",
          "annoyingKids": 7,
          "peopleWhoPostYourWorstPictureToSocialMedia": 7,
          "greenPepper": 2,
          "studying": 2,
          "joker": 4,
          "beingInATinyLittleSpace": 6,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 1
      },
      {
          "timestamp": "2020-02-19T10:55:09.171Z",
          "annoyingKids": 4,
          "peopleWhoPostYourWorstPictureToSocialMedia": 7,
          "greenPepper": 1,
          "studying": 10,
          "joker": 3,
          "beingInATinyLittleSpace": 10,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 10
      },
      {
          "timestamp": "2020-02-19T10:56:33.364Z",
          "annoyingKids": 10,
          "peopleWhoPostYourWorstPictureToSocialMedia": 9,
          "greenPepper": 7,
          "studying": 4,
          "joker": 9,
          "beingInATinyLittleSpace": 6,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 9
      },
      {
          "timestamp": "2020-02-19T11:14:47.650Z",
          "annoyingKids": 8,
          "peopleWhoPostYourWorstPictureToSocialMedia": 10,
          "greenPepper": 1,
          "studying": 5,
          "joker": 1,
          "beingInATinyLittleSpace": 8,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 6
      },
      {
          "timestamp": "2020-02-19T11:23:41.831Z",
          "annoyingKids": 10,
          "peopleWhoPostYourWorstPictureToSocialMedia": 10,
          "greenPepper": 10,
          "studying": 3,
          "joker": 5,
          "beingInATinyLittleSpace": 3,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 10
      },
      {
          "timestamp": "2020-02-19T11:41:50.051Z",
          "annoyingKids": 10,
          "peopleWhoPostYourWorstPictureToSocialMedia": 9,
          "greenPepper": 6,
          "studying": 6,
          "joker": 8,
          "beingInATinyLittleSpace": 5,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 10
      },
      {
          "timestamp": "2020-02-19T12:06:47.579Z",
          "annoyingKids": 8,
          "peopleWhoPostYourWorstPictureToSocialMedia": 10,
          "greenPepper": 7,
          "studying": 6,
          "joker": 2,
          "beingInATinyLittleSpace": 6,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 8
      },
      {
          "timestamp": "2020-02-19T15:45:50.295Z",
          "annoyingKids": 9,
          "peopleWhoPostYourWorstPictureToSocialMedia": 10,
          "greenPepper": 7,
          "studying": 3,
          "joker": 3,
          "beingInATinyLittleSpace": 1,
          "fitnessYoutubersWhoseVideosDidNoHelpToYouAtAll": 5
      }
  ]



function averageData(data){
  let newData = [];
  let keys = Object.keys(data[0]);
  console.log(keys);
  for(let i = 0; i < keys.length; i++){
    let key = keys[i];
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      if(key in datum){
        sum += datum[key];
        num++;
      }
    }

    let avg = sum/num;
      if(!isNaN(avg)){
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      newData.push(newDataPoint);
    }
  }
  return newData;
}


console.log(data);
let  transformedData = averageData(data);
console.log(transformedData);





for ( let i = 0; i < transformedData.length; i++){
  let datapoint = transformedData[i];
  console.log(datapoint.name);

  let bar = document.createElement("div");
  bar.className = "bar";
  bar.style.width = datapoint.average * 60 + "px";

  var num = datapoint.average;
  num = num.toFixed(2);
  bar.innerHTML = datapoint.name + "<br>"+ num + "/15";

  document.getElementById("viz").appendChild(bar);
}
