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
    // Create a series of objects
    const musicians = [
      { name: 'Bob' },
      { name: 'Dylan' },
      { name: 'Steve' },
      { name: 'George' },  
    ]; 
    // Loop through each, (for loop) 
    // and save each
    const db = new SimpleDb(TEST_DIR);

    musicians.forEach(async object => {
      await db.save(object);
    });
    // then getAll from simple-db
    expect(await db.getAll()).toEqual([
      { name: expect.any(String) },
      { name: expect.any(String) },
      { name: expect.any(String) },
      { name: expect.any(String) }
    ]);

    // Expect the created object (in test) to match the getAll from simple-db

    
  });

});

// create object then
// pass object through database.save (25)
