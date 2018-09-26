module.exports = {
  serverUrl        : "mongodb://localhost/",
  port             : 27017,
  dbName           : "iMean",
  username         : "",
  password         : "",
  getConnUrl       : function() { return this.serverUrl + this.dbName; }
}
