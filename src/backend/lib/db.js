const connect = require('camo').connect;

export default class DB {
  generateDBURI(config) {
    return `nedb://${config.nedb_dir}`;
  }

  constructor(config) {
    this.uri = this.generateDBURI(config);
  }

  connect() {
    return connect(this.uri);
  }
}
