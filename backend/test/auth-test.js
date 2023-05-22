const { postLogin, postLogout, postSignup } = require('../controller/auth'); // Replace with the actual path to your module file
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const sinon = require('sinon');

describe('Auth Controlle test', () => {
    it('should log in the user and set session variables when provided with valid credentials', (done) => {
        const req = {
          body: {
            email: 'matan@gmail.com',
            password: '123456',
          },
          session: {save:() => {}}, // Mock the session object
        };
        const res = {
          json: sinon.stub(),
        };
        const next = sinon.stub();
      
        // Stub the necessary methods of Admin and bcrypt
        const findByEmailStub = sinon.stub(Admin, 'findByEmail').resolves({ email: 'matan@gmail.com', password: '123456' });
        const compareStub = sinon.stub(bcrypt, 'compare').resolves(true);
      
        // Stub the save method of the session object
        const saveStub = sinon.stub(req.session, 'save').callsFake(function (callback) {
          // Invoke the callback function with no error
          callback(null);
        });
      
        // Invoke the postLogin function
        postLogin(req, res, next);
      
        // Wait for the asynchronous code to complete
        setTimeout(() => {
          try {
            // Assertions
            expect(findByEmailStub.calledOnceWithExactly(req.body.email)).to.be.true;
            expect(compareStub.calledOnceWithExactly(req.body.password, '123456')).to.be.true;
            expect(req.session.isLoggedIn).to.be.true;
            expect(req.session.user).to.deep.equal({ email: 'matan@gmail.com', password: '123456' });
            expect(res.json.calledOnceWithExactly('succeeded')).to.be.true;
            expect(next.called).to.be.false;
      
            // Restore the stubbed methods
            findByEmailStub.restore();
            compareStub.restore();
            saveStub.restore();
      
            done();
          } catch (error) {
            done(error);
          }
        }, 0);
      });

      it('should log out the user and destroy the session', async () => {
        const req = {
          session: { destroy: sinon.stub().callsFake(function (callback) { callback(null); }) }, // Mock the session object with destroy method
        };
        const res = {
          json: sinon.stub(),
        };
        const next = sinon.stub();
      
        // Invoke the postLogout function
        await postLogout(req, res, next);
      
        // Assertions
        expect(req.session.destroy.calledOnce).to.be.true;
        expect(res.json.calledOnceWithExactly('ok')).to.be.true;
        expect(next.called).to.be.false;
      });

      it('should create a new admin user and return "ok"', (done) => {
        const req = {
          body: {
            email: 'test@example.com',
            password: 'password123',
          },
        };
        const res = {
          json: sinon.stub(),
        };
        const next = sinon.stub();
      
        // Stub the necessary methods of bcrypt and Admin
        const hashStub = sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
        const saveStub = sinon.stub(Admin.prototype, 'save').resolves({ _id: '123', email: 'test@example.com' });
      
        // Invoke the postSignup function
        postSignup(req, res, next);
      
        // Wait for the asynchronous code to complete
        setTimeout(() => {
          try {
            // Assertions
            expect(hashStub.calledOnceWithExactly(req.body.password, 12)).to.be.true;
            expect(saveStub.calledOnce).to.be.true;
            expect(res.json.calledOnceWithExactly('ok')).to.be.true;
            expect(next.called).to.be.false;
      
            // Restore the stubbed methods
            hashStub.restore();
            saveStub.restore();
      
            done();
          } catch (error) {
            done(error);
          }
        }, 0);
      });
});
