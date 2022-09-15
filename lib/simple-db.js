const fs = require('fs/promises');
const path = require('path');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }
  get(id) {
    return fs.readFile(`${this.dirPath}/${id}.json`)
      .then((stringBuffer) => {
        return JSON.parse(stringBuffer.toString());
      });
  }
}

module.exports = SimpleDb;
