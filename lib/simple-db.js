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
  getAll() {
    // get a list of all files
    // .then, 
    // (loop(map) through each file name using get(id), 
    // parse entire array out id using file.split
    // Make an array of promises, pass the array of promises to promise.all (promise.all(pass in array of promises)) returns array of objects

    // Try using [‘adoifjgado.json’, 'adsoij2387.json’]
    // file.split(‘.’)
    // ['adoifjgado’, ‘json’]

    // (Return a promise.all with an array of get calls)

    return fs.readdir(this.dirPath).then(paths => {
      const promises = paths.map(path => 
        fs.lstat(`${this.dirPath}/${path}`).then(stat => {
          if (stat.isDirectory()) {
            return '';
          } else {
            const id = path.replace('.json', '');
            return this.get(id);
          }
        }));
      return Promise.all(promises);
    });
  }
}

module.exports = SimpleDb;
