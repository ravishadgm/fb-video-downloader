const instagramUrlDirect = require("instagram-url-direct");

async function getInstagramMedia(url) {
  return instagramUrlDirect.instagramGetUrl(url);
}

module.exports = {
  getInstagramMedia,
};
