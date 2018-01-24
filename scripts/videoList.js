/* global store, api */

const videoList = (function(){
  /**
   * Accepts an AJAX response object and converts the appropriate data to an 
   * array of decorated video objects to be placed in the Store.
   * @param   {Object} response - Response from Youtube Search API
   * @returns {Array} - [ { title: String, thumbnails: Object, videoUrl: String, channelTitle: String } ]
   */
  const decorateResponse = function(response) {
    return response.items.map(item => {
      const { title, thumbnails, channelTitle } = item.snippet;
      const { videoId } = item.id;
      return {
        title, thumbnails, channelTitle,
        videoUrl: videoId ? `https://youtube.com/watch?v=${videoId}` : null
      };
    });
  };

  /**
   * Takes in decorated video object and returns HTML snippet
   * @param   {Object} video - should contain title, thumbnails, channelTitle, videoUrl properties 
   * @returns {String}       - HTML ready for DOM 
   */
  const generateListItem = function(video) {
    const { title, thumbnails, channelTitle, videoUrl } = video;
    return `
      <a target="_blank" class="list-item" href="${videoUrl || '#'}">
        <li>
          <div class="col col-left">
            <img src="${thumbnails.medium.url}" />
          </div>
          <div class="col col-right">
            <div class="video-content">
              <p class="heading">${title}</p>
              <p class="author">by ${channelTitle}</p>
            </div>
          </div>
        </li>
      </a>
      `;
  };

  /**
   * Creates Form Submit event listener. Fetches search term input from DOM. Calls API
   * function, then decorates the response, places the decorated response in store, and calls
   * for re-render.
   */
  const handleFormSubmit = function() {
    $('form').submit(e => {
      e.preventDefault();
      const searchInput = $('#search-term');
      const searchTerm = searchInput.val();
      api.fetchVideos(searchTerm, videos => {
        searchInput.val('');
        const decoratedVideos = decorateResponse(videos);
        store.setVideos(decoratedVideos);
        render();
      });
    });
  };

  const bindEventListeners = function() {
    handleFormSubmit();
  };

  const render = function() {
    const elements = store.videos.map(video => generateListItem(video));
    $('.results').html(elements);
  };

  return {
    bindEventListeners,
    render,
  };
    
}());