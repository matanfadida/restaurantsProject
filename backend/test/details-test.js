const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const Details = require("../models/DetailsRestorent");
const sinon = require('sinon');
const { getDetails, postEditDetails, postSendEmail } = require('../controller/details');
const { ObjectId } = require('mongodb'); // Import the ObjectId constructor from the mongodb package


describe('Details Controller test', () => {
  it('should fetch the email ID', (done) => {
    // Mock the request and response objects
    const req = {};
    const res = {
      json: sinon.stub(),
    };

    // Stub the Details.fetchEmail method
    const fetchEmailStub = sinon.stub(Details, 'fetchEmail').resolves('test@example.com');

    // Invoke the getDetails function
    getDetails(req, res);

    // Wait for the asynchronous code to complete
    setTimeout(() => {
      try {
        // Assertions
        expect(fetchEmailStub.calledOnce).to.be.true;
        expect(res.json.calledOnceWithExactly('test@example.com')).to.be.true;

        // Restore the stubbed method
        fetchEmailStub.restore();

        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });

  it('should save the edited details', (done) => {
    // Mock the request and response objects
    const req = {
      body: {
        emailId: new ObjectId().toHexString(), // Use a valid ObjectId value
        email: 'test@example.com',
        phone: '123456789',
        address: '123 Street',
        facebook: 'facebook.com/test',
        instagram: 'instagram.com/test',
      },
    };
    const res = {
      json: sinon.stub(),
    };

    // Stub the Details.prototype.save method
    sinon.stub(Details.prototype, 'save').resolves();

    // Invoke the postEditDetails function
    postEditDetails(req, res);

    // Wait for the asynchronous code to complete
    setTimeout(() => {
      try {
        // Assertions
        expect(Details.prototype.save.calledOnce).to.be.true;
        expect(res.json.calledOnceWithExactly('ok')).to.be.true;

        // Restore the stubbed method
        Details.prototype.save.restore();

        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });

  it('should send an email', (done) => {
    // Mock the request and response objects
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test Message',
      },
    };
    const res = {
      json: sinon.stub(),
      send: sinon.stub(),
    };

    // Stub the Details.fetchEmail method
    sinon.stub(Details, 'fetchEmail').resolves([{ email: 'owner@example.com' }]);

    // Create a stub for the transporter object
    const transporter = {
      sendMail: sinon.stub().callsFake((mailOptions, callback) => {
        // Simulate a successful email sending
        callback(null, { response: 'Email Sent' });
      }),
    };

    // Invoke the postSendEmail function
    postSendEmail(req, res, transporter);

    // Wait for the asynchronous code to complete
    setTimeout(() => {
      try {
        // Assertions
        expect(Details.fetchEmail.calledOnce).to.be.true;
        expect(transporter.sendMail.calledOnce).to.be.true;
        expect(res.json.calledOnceWithExactly('ok')).to.be.true;

        // Restore the stubbed methods
        Details.fetchEmail.restore();

        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });

});