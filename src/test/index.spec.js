const mockDB = require('./inMemoryDB');
const user = require('./user/user.spec');

const { describe, before } = require('mocha');

describe('Test Cases: ', () => {
    before(async () => await mockDB.connect());

    describe('User Stats', user);
})