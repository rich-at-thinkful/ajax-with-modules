/* global API_KEY */

const api = (function(){
  const BASE_API = 'https://www.googleapis.com/youtube/v3/search';

  /**
   * Asyncronously call Youtube API and invoke callback when response received, 
   * sending in a `videos` array of objects with following properties:
   * title (string), thumbnails (array), channelTitle (string), videoId (string)
   *  
   * @param {string}   searchTerm
   * @param {function} callback
   */
  const fetchVideos = function(searchTerm, callback) {

    const query = {
      part: 'snippet',
      key: API_KEY,
      q: searchTerm
    };

    $.getJSON(BASE_API, query, callback);
  };

  return {
    fetchVideos,
  };
}());