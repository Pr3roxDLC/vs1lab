
/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...

function updateLocation(help) {
    console.log(help);
    document.getElementById("latitude").setAttribute("value", help.latitude);
    document.getElementById("longitude").setAttribute("value", help.longitude);
    document.getElementById("latitudediscovery").setAttribute("value", help.latitude);
    document.getElementById("longitudediscovery").setAttribute("value", help.longitude);
    console.log(document.getElementById("mapView").getAttribute("data-tags"));
    document.getElementById("mapView").setAttribute("src", new MapManager("rM6ddjDPwLV4UfXhwL7O8FM6b4iiCfHl").getMapUrl(help.latitude, help.longitude, JSON.parse(document.getElementById("mapView").getAttribute("data-tags")), 13));
}

function fetchGeoTags(){
    fetch('http://localhost:3000/api/geotags/?' + new URLSearchParams({
        'searchterm': document.getElementById('searchterm').value,
        'longitude': document.getElementById('longitude').getAttribute('value'),
        'latitude': document.getElementById('latitude').getAttribute('value'),
    }), {
        method: 'GET',
    })
    .then(res => res.json())
    .then(geoTags => {
        let list = document.getElementById("discoveryResults");
        list.innerHTML = "";
        for(let geoTag of geoTags){
            var entry = document.createElement('li');
            entry.appendChild(document.createTextNode(
                geoTag.name + ' (' 
                + geoTag.latitude + ',' 
                + geoTag.longitude + ') '
                + geoTag.hashtag));
            list.appendChild(entry);
        }
        document.getElementById("mapView").setAttribute("src", new MapManager("rM6ddjDPwLV4UfXhwL7O8FM6b4iiCfHl")
        .getMapUrl(
            document.getElementById('latitude').getAttribute('value'), 
            document.getElementById('longitude').getAttribute('value'), 
            geoTags, 13));
    })
}



// Wait for the page to fully load its DOM content, then call updateLocation
document.getElementById('submitTagging').addEventListener('click', function(e) {
    e.preventDefault();
    if ((document.getElementById("hashtag").value.startsWith('#')&&document.getElementById("hashtag").value.length <=10)
        &&(document.getElementById("name").value.length<=10)){
    var geoTag = {};
    geoTag.name = document.getElementById("name").value;
    geoTag.latitude = document.getElementById("latitude").getAttribute("value");
    geoTag.longitude = document.getElementById("longitude").getAttribute("value");
    geoTag.hashtag = document.getElementById("hashtag").value;

    fetch('http://localhost:3000/api/geotags', {
        method: 'POST',
        body: JSON.stringify(geoTag),
        headers: {
            "Content-Type": "application/json",
        }      
    }).then(_ =>{
        fetchGeoTags();
    })
  }
});

document.getElementById('submitDiscovery').addEventListener('click', function(e){
    e.preventDefault();
    fetchGeoTags();
});

document.addEventListener("DOMContentLoaded", () => {
    LocationHelper.findLocation(updateLocation);
});