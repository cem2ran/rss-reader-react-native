function fetchRss(_url) {
  let url = _url;
  if (!/^http:\/\//.test(url)) {
    url = "http://" + url;
  }
  /* //deprecated as of September 29th, 2016
   const GOOGLE_FEED_API_URL = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q="
   url = GOOGLE_FEED_API_URL + encodeURIComponent(url);
   */
  url = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feednormalizer%20where%20url%3D%27${encodeURIComponent(
    url
  )}%27%20and%20output%3D%27atom_1.0%27%20&format=json`;
  return fetch(url).then(res => {
    return res.json();
  });
}

export default {
  fetch: fetchRss
};
