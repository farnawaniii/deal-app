const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app'); // Adjust the path to your app file
const { expect } = chai;

chai.use(chaiHttp);

class UserTest {
    getUserStats = async () => {
        chai
            .request(app)
            .post('/user/getUserStats')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyOTgzYzRkOTAxZDQ5YTA3MGEyYjkiLCJuYW1lIjoiY2xpZW50IiwicGhvbmUiOiIwMTAwNzY2MTYxNCIsInJvbGUiOiJDTElFTlQiLCJpYXQiOjE3MjA4OTMyNjV9.39KMvTX4hrEuc83oYFXorKmFMHy6ktDV9b2NES-UldQ').send()
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                // expect(res.body).to.have.property('message', 'Request Created Successfully');
                done();
            });

    };
}

module.exports = new UserTest();