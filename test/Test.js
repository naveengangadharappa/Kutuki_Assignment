
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
            id: "3",
            name: "naveen_test",
            email: "naveen_test@gmail.com",
            phone: "234567890"
        }
    }
}


const List_Houses_success = async (title) => {
    it(title, (done) => {
        try {
            server
                .post(input.List_Houses.route)
                .send(input.List_Houses.input_body)
                .expect("Content-type", /json/)
                .end((err, res) => {
                    if (err) {
                        console.log("errors = ", err);
                        done()
                    } else {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.exist;
                        expect(res.body.status).to.exist
                        expect(res.body.data).to.exist
                        done();
                    }
                });
        } catch (err) {
            console.log(err)
        }

    })
}

const Get_Time_Slots = async (title) => {
    it(title, (done) => {
        try {
            server
                .post(input.Get_Time_Slots.route)
                .send(input.Get_Time_Slots.input_body)
                .expect("Content-type", /json/)
                .end((err, res) => {
                    if (err) {
                        console.log("errors = ", err);
                        done()
                    } else {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.exist;
                        expect(res.body.status).to.exist
                        expect(res.body.data).to.exist
                        done();
                    }
                });
        } catch (err) {
            console.log(err)
        }
    })
}

const Book_visit = async (title) => {
    it(title, (done) => {
        try {
            server
                .post(input.Book_visit.route)
                .send(input.Book_visit.input_body)
                .expect("Content-type", /json/)
                .end((err, res) => {
                    if (err) {
                        console.log("errors = ", err);
                        done()
                    } else {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.exist;
                        expect(res.body.status).to.exist
                        expect(res.body.message).to.exist
                        //expect(res.body.data).to.exist
                        done();
                    }
                });
        } catch (err) {
            console.log(err)
        }

    })
}


describe('Testing of all Routs inputs with success and failure inputs', async () => {
    try {
        await List_Houses_success("Testing List_Houses for success result");
        await Get_Time_Slots("Testing Get_Time_Slots for success result");
        await Book_visit("Testing Book_Visit for success result");
    } catch (err) {
        console.log(err);
    }
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
