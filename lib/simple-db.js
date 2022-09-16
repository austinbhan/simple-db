const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

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
  save(obj) {
    const id = crypto.randomBytes(4).toString('hex');
    return fs.writeFile(`${this.dirPath}/${id}.json`, JSON.stringify(obj))
      .then(() => {
        return id;
      });
  }
}

module.exports = SimpleDb;
