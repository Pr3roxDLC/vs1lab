// File origin: VS1LAB A3

const GeoTagExamples = require("./geotag-examples");

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore{

  static #geoTags = GeoTagExamples.tagList.map((tag)=>{
    return{"name":tag[0], "latitude":tag[1], "longitude":tag[2], "hashtag":tag[3]}
    });

  static addGeoTag(geoTag) {
    this.#geoTags.push(geoTag);      
    console.log(this.#geoTags);
}

  static removeGeoTag(name){
    this.#geoTags.splice(this.#geoTags.findIndex((geoTag)=>geoTag.name===name),1)
  }

  static getNearbyGeoTags(longitude, latitude){
    return this.#geoTags.filter((geoTag)=>this.#isInProximity(geoTag, latitude, longitude));
  }

  static #isInProximity(geoTag, latitude, longitude){
    var distance = Math.sqrt((Math.abs(geoTag.latitude-latitude)**2)+Math.abs(geoTag.longitude-longitude)**2);
    return distance <=20;
  }

  static searchNearbyGeoTags(keyword, longitude, latitude){
    console.log(this.getNearbyGeoTags(longitude, latitude).filter((geoTag)=>this.#testKeyword(geoTag, keyword)));
    return this.getNearbyGeoTags(longitude, latitude).filter((geoTag)=>this.#testKeyword(geoTag, keyword));
}
  
  static #testKeyword(geoTag, keyword){
    if (geoTag.name.includes(keyword)){
        return true;
    }else if(geoTag.hashtag.includes(keyword)){
        return true;
    }
    return false;
  }
}

module.exports = InMemoryGeoTagStore
