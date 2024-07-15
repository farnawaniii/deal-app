const user = require('./user.test');

module.exports = () => {
    it('Get User Stats', user.default.getUserStats);
};