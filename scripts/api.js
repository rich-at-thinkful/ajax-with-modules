/* global API_KEY */

const api = (function(){
  const BASE_API = 'https://www.googleapis.com/youtube/v3/search';

  /**
   * Asyncronous function that accepts a search term, then constructs and invokes
   * an AJAX call to Youtube Search API. Callback is invoked on the response to
   * the AJAX call.
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