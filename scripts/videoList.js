/* global store, api */

const videoList = (function(){
  /**
   * Uses Youtube response to create a simple object of key data needed to render HTML
   * @param   {Object} response - Response from Youtube Search API
   * @returns {Object}          
   * - { title: String, thumbnails: Object, videoUrl: String, channelTitle: String } 
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