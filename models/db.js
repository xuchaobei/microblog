var settings = require('../settings');
var url = 'mongodb://'+settings.host+':27017/'+settings.db;

module.exports = url;
