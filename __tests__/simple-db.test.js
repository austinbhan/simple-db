const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const SimpleDb = require('../lib/simple-db');
const { get } = require('http');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('get(id) returns file contents', async () => { // Test 1
    const obj = {
      name: '1234'
    };
    const id = crypto.randomBytes(4).toString('hex');
    await fs.writeFile(`${TEST_DIR}/${id}.json`, JSON.stringify(obj));
  
    const db = new SimpleDb(TEST_DIR);
    const result = await db.get(id);
    expect(result).toEqual(obj);
  });

  it('save(obj) turns object name into [id].json', async () => { // Test 2
    const obj = {
      name: '1234'
    };

    const db = new SimpleDb(TEST_DIR);
    const id = await db.save(obj);
    // console.log(JSON.stringify(id));
    const expected = await db.get(id);

    // Work from Here
    console.log('line 39', expected);
    console.log('line 40', obj);

    expect(expected).toEqual(obj);
  });

  it('getall gets all objects in the directory', async () => { // Test 3 

    const musicians = [
      { name: 'Bob' },
      { name: 'Dylan' },
      { name: 'Steve' },
      { name: 'George' },  
    ]; 

    const db = new SimpleDb(TEST_DIR);

  // forEach loop (obsolete)
    // musicians.forEach(async object => {
    //   await db.save(object);
    // });

    // Using promises
    const storedMusicians = musicians.map(async object => {
      await db.save(object);
    });

    return Promise.all(storedMusicians)
      .then(() => {
        return db.getAll().then((results) => {
          expect(results).toEqual([
            { name: expect.any(String) },
            { name: expect.any(String) },
            { name: expect.any(String) },
            { name: expect.any(String) }
          ]);
        });
        
      });


  });

});

// create object then
// pass object through database.save (25)
