chrome.tabs.onActivated.addListener(cleanFeed);
chrome.webNavigation.onCompleted.addListener(cleanFeed, {
  url: [{ hostContains: "linkedin.com" }, { hostPrefix: "www" }],
})

function cleanFeed(active) {
  chrome.tabs.get(active.tabId, function (tab) {
    chrome.tabs.insertCSS(active.tabId, { code: cleanupCSS() }, () => {
      console.log('Cleaned up linkedin feed CSS')
    });
    chrome.tabs.executeScript(active.tabId, { file: 'clf.js' }, () => {
      console.log('Cleaned up linkedin feed JS')
    });
  });
}

function cleanupCSS() {
  return `
    /* image in link preview */
    .feed-shared-article__link-container, .feed-shared-article__image-link,
    .update-components-article__link-container,

    /* image */
    .feed-shared-image, .feed-shared-image__container,
    .update-components-image__container,
    .feed-shared-celebration-image,

    /* video */
    .feed-shared-linkedin-video, .media-player,

    /* external video */
    .feed-shared-external-video__container,

    /* documents and presentations */

    .feed-shared-document__container, .feed-shared-document, iframe {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
  `;
}
