var util = {
  parsePath: function (url) {
    if (!url || typeof url !== 'string') {
      return url;
    }

    var start = url.search(/\//);
    var end = url.search(/\?/);
    return end === -1 ? url.slice(start) : url.slice(start, end);
  }
}

module.exports = util;
