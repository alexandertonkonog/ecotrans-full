const url = require('url');

const getFullStaticUrl = (req, pathname) => {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: '/static/upload/' + pathname 
  });
}

const makeFilesJSONForDb = (req) => {
    let linksArray = req.files.map(item => ({link: getFullStaticUrl(req, item.filename), name: item.filename}));
    return JSON.stringify(linksArray);
}

module.exports = {
    getFullStaticUrl,
    makeFilesJSONForDb
}