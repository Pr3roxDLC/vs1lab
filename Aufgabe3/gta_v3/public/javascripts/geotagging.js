
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



// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    LocationHelper.findLocation(updateLocation);
});