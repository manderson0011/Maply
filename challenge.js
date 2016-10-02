

var areaName;



function searchBox() {
    var postcode = $("#address").val();
   findAddress("", "", postcode);

}

$(function () {
    $("pac-input").on("click", searchBox);

});


function findAddress(city, state, address) {
  
    var addAddress  = "";
    if (address.length != 0) {
        addAddress = address.trim();
 }
    else if (city.length != 0 && state != 0) {
        addAddress = city.trim() + ", " + state;
 }
    else {
        return;


 }




    var pullGoogle = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addAddress + "&key=AIzaSyBYU-nRSm6HXOq470xg5b_A5bXOwz7rOh4";

    var request = {
        url: pullGoogle,
        success: findAddress_Complete
};

    $.ajax(request);
}
function findAddress_Complete(result) {
    var lat = result.results[0].geometry.location.lat;
    var long = result.results[0].geometry.location.lng;
    areaName = result.results[0].address_components[1].short_name + "," +
               result.results[0].address_components[3].short_name;
    darkSky(lat, long);

}

function darkSky(lat, long) {
    var darkSky = "https://api.darksky.net/forecast/60dfe781e615860cf1939b773279e5a6/" + lat + "," + long;
    var weather = {
        url: darkSky,
        dataType: "jsonp",
        success: darkSky_Complete
};

    $.ajax(weather);
}

function darkSky_Complete(result) {
    console.log("It is currently " + result.timezone + ".");

    var data = {
        time: 
         Date(result.currently.time * 1000),
        lrgTemp: Math.round((result.currently.temperature)) + "&deg",
        crntCond: (result.currently.summary),
        tempMin: Math.round((result.daily.data[0].temperatureMin)) + "&deg",
        rainChance: (result.daily.data[0].precipProbability),
        maxTemp: Math.round ((result.daily.data[0].temperatureMax)) + "&deg",
        minText: ("Min"),
        rainChancetext: ("Rain Chance"),
        maxText: ("Max"),
        icon:(result.currently.icon)
};

    cardChange2(data);
    pickCard(data);
}


  