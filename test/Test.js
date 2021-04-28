
let expect = require('chai').expect;
let request = require('supertest');

let server = request.agent("http://localhost:3000/Assignment")
let input = {
    List_Houses: {
        route: '/List_houses',
        input_body: {

        }
    },
    Get_Time_Slots: {
        route: '/Get_Time_Slots',
        input_body: {

        }
    },
    Book_visit: {
        route: '/Book_visit',
        input_body: {

        }
    }
}


const List_Houses_success = async (title) => {
    it(title, async () => {
        try {
            server
                .post(input.List_Houses.route)
                .send(input.List_Houses.input_body)
                .expect("Content-type", /json/)
                .end(function (err, res) {
                    if (err) {
                        console.log("errors = ", err);
                        return;
                    } else {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.exist;
                        expect(res.body.status).to.exist
                        expect(res.body.data).to.exist
                        return;
                    }
                });
        } catch (err) {
            done(err)
            console.log(err)
        }

    })
}

describe('Testing of all routs inputs with success and failure inputs', async () => {
    await List_Houses_success("Testing List_Houses for success result");
});




// chai.request(app)
//     .post('/Mission_Onboarding/Login')
//     .send(input_content.login.employee_success)
//     .end((err, res) => {
            //         if (err) { done(err) }
            //         res.should.have.status(200);
            //         res.body.should.be.a('object');
            //         res.body.should.have.property('data');
            //         res.body.should.have.property('message');
            //         res.body.should.have.property('status').eq(true);
            //         done();
            //     });           
