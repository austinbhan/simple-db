const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const SimpleDb = require('../lib/simple-db');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('get(id) returns file contents', async () => {
    const obj = {
      name: '1234'
    };
    const id = crypto.randomBytes(4).toString('hex');
    await fs.writeFile(`${TEST_DIR}/${id}.json`, JSON.stringify(obj));
  
    const db = new SimpleDb(TEST_DIR);
    const result = await db.get(id);
    expect(result).toEqual(obj);
  });

});
