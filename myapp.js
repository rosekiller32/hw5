/*
Skycons is a set of ten animated weather glyphs, procedurally generated by JavaScript using the HTML5 canvas tag.
http://darkskyapp.github.io/skycons/
*/

var city="臺北市";
var $temp=$(".temperature");

var $dayOneTemp=$("#dayOneTemp");
var $dayTwoTemp=$("#dayTwoTemp");
var $dayThreeTemp=$("#dayThreeTemp");
var $date=$(".date");
var $weather=$("#weather")

var skycons = new Skycons();

$.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+city+'")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',function(data){
  var currentTemperature = data.query.results.channel.item.condition.temp;
  var item=data.query.results.channel.item;
  var forecast=item.forecast;
  var cond=item.condition;
  var dat=cond.date.split(" ");
  var date= dat[1]+" "+dat[2]+" "+dat[3];
  $temp.text(tempTransfer(cond.temp));
  $dayOneTemp.text(tempTransfer(forecast[1].low)+"-"+tempTransfer(forecast[1].high));
  $dayTwoTemp.text(tempTransfer(forecast[2].low)+"-"+tempTransfer(forecast[2].high));
  $dayThreeTemp.text(tempTransfer(forecast[3].low)+"-"+tempTransfer(forecast[3].high));
  $date.text(date);
  $("#dayOne").text(forecast[1].date);
  $("#dayTwo").text(forecast[2].date);
  $("#dayThree").text(forecast[3].date);
  $weather.text(cond.text);
  var status=data.query.results.channel.item.condition.code;

  skycons_state("today",data.query.results.channel.item.condition.text);
  skycons_state("day1",data.query.results.channel.item.forecast[1].text);
  skycons_state("day2",data.query.results.channel.item.forecast[2].text);
  skycons_state("day3",data.query.results.channel.item.forecast[3].text);
  
});


$( "li" ).each(function( index,element) {
  city=$(element).text();
  $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+city+'")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',function(data){
    var temp=data.query.results.channel.item.condition.temp;
    temp= tempTransfer(temp);
    console.log('temp',temp);
    console.log('city',city);
    $(element).text($(element).text()+"  "+temp);
  });
});

  // on Android, a nasty hack is needed: {"resizeClear": true}

  $("#dropdown li").on('click', function(e){
    city=$(this).text();
    console.log('Event Object', e);
    $('button').text(city);
    $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+city+'")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',function(data){
    console.log (data) ;
    var currentTemperature = data.query.results.channel.item.condition.temp;
    var item=data.query.results.channel.item;
    var forecast=item.forecast;
    var cond=item.condition;
    var dat=cond.date.split(" ");
    var date= dat[1]+" "+dat[2]+" "+dat[3];
    $temp.text(tempTransfer(cond.temp));
    $dayOneTemp.text(tempTransfer(forecast[1].low)+"-"+tempTransfer(forecast[1].high));
    $dayTwoTemp.text(tempTransfer(forecast[2].low)+"-"+tempTransfer(forecast[2].high));
    $dayThreeTemp.text(tempTransfer(forecast[3].low)+"-"+tempTransfer(forecast[3].high));
    $date.text(date);
    $weather.text(cond.text);
    skycons_state("today",data.query.results.channel.item.condition.text);
    skycons_state("day1",data.query.results.channel.item.forecast[1].text);
    skycons_state("day2",data.query.results.channel.item.forecast[2].text);
    skycons_state("day3",data.query.results.channel.item.forecast[3].text);
    });

  });

function tempTransfer(temp) {
  var temp=Math.round((temp-32)*(5/9));
  return temp;
}
var skycons_state = function(date,status){
    if(status.search("Sunny") >= 0){
      skycons.set(date, Skycons.CLEAR_DAY);
    }
    else if(status.search("Partly Cloudy") >= 0){
      skycons.set(date, Skycons.PARTLY_CLOUDY_DAY);
    }

    else if(status.search("Cloudy") >= 0){
      skycons.set(date, Skycons.CLOUDY);
    }

    else if(status.search("Rain") >= 0){
      skycons.set(date, Skycons.RAIN);
    }

    else if(status.search("Shower") >= 0){
      skycons.set(date, Skycons.RAIN);
    }
    else if(status.search("Windy") >= 0){
      skycons.set(date, Skycons.WIND);
    }
    else if(status.search("Snow") >= 0){
      skycons.set(date, Skycons.SNOW);
    }

    else if(status.search("Foggy") >= 0){
      skycons.set(date, Skycons.FOG);
    }

    else if(status.search("Thunderstorms") >= 0){
      skycons.set(date, Skycons.RAIN);
    }
}





  

  // you can add a canvas by it's ID...
  skycons.add("today", Skycons.PARTLY_CLOUDY_DAY);
  skycons.add("day1", Skycons.CLEAR_DAY);
  skycons.add("day2", Skycons.CLOUDY);
  skycons.add("day3", Skycons.RAIN);

  // start animation!
  skycons.play();
  
  // want to change the icon? no problem:
  skycons.set("today", Skycons.PARTLY_CLOUDY_NIGHT);
  
/*
Get value from Bootstrap dropdown menu
*/
$('#dropdown li').on('click', function(){
    alert($(this).text());
});
