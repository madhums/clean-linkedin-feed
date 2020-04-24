chrome.tabs.onActivated.addListener(cleanFeed);
chrome.webNavigation.onCompleted.addListener(cleanFeed)

function cleanFeed(active) {
  chrome.tabs.get(active.tabId, function (tab) {
    if (tab.url && (tab.url.includes('://www.linkedin.com/') ||
      tab.url.includes('://linkedin.com/'))) {
      chrome.tabs.insertCSS(active.tabId, { code: cleanupCSS() }, () => {
        console.log('Cleaned up linkedin feed')
      });
    }
  });
}

function cleanupCSS() {
  return `
    /* image in link preview */
    .feed-shared-article__link-container, .feed-shared-article__image-link,

    /* image */
    .feed-shared-image, .feed-shared-image__container,

    /* video */
    .feed-shared-linkedin-video, .media-player,

    /* external video */
    .feed-shared-external-video__container,

    /* documents and presentations */
    .feed-shared-linkedin-document__container, .feed-shared-document, iframe {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
  `;
}
