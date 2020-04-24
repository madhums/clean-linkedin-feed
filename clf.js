// feed item
var feed = document.querySelectorAll('.core-rail > div:nth-child(3) > div');

// cleans up the feed by hiding all the nodes that contain the following
var arr = [
  'likes this',
  'commented on this',
  'loves this',
  'celebrates this',
  'finds this insightful',
  'was mentioned in the news',
  'jobs recommended for you'
];

feed.forEach((node) => {
  if (arr.filter(s => node.textContent.toLowerCase().includes(s)).length) {
    node.setAttribute('style', 'display: none;');
  }
})

// @todo: Figure out a way to execute the above once xhr calls happen.
// Right now, it won't hide the feed items that are loaded via xhr calls
