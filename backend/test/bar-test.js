const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const Order = require('../models/Order');
const sinon = require('sinon');
const { postEditStatusProduct, getOrders } = require('../controller/bar'); // Replace with the actual path to your module file


describe('Auth Controlle test', () => {
    it('should update the status of a product and return "ok"', (done) => {
        const req = {
          body: {
            idProduct: 'product123',
            idOrder: 'order123',
            status: 'completed',
            numberTable: 1,
          },
        };
        const res = {
          json: sinon.stub(),
          status: sinon.stub().returnsThis(),
        };
        const io = {
          emit: sinon.stub(),
        };
      
        // Stub the necessary methods of Order
        const findByIdStub = sinon.stub(Order, 'findById').resolves({ products: [] });
        const updateStatusProductStub = sinon.stub(Order, 'updateStatusProduct').resolves();
        const fetchAllOrdersStub = sinon.stub(Order, 'fetchAllOrders').resolves([{ numberTable: 1 }]);
      
        // Invoke the postEditStatusProduct function
        postEditStatusProduct(req, res, io);
      
        setTimeout(() => {
          try {
            // Assertions
            expect(findByIdStub.calledOnceWithExactly(req.body.idOrder)).to.be.true;
            expect(updateStatusProductStub.calledOnceWithExactly(req.body.idOrder, req.body.status, [], req.body.idProduct)).to.be.true;
            expect(fetchAllOrdersStub.calledOnce).to.be.true;
            expect(res.json.calledOnceWithExactly('ok')).to.be.true;
            expect(res.status.calledOnceWithExactly(500)).to.be.false;
            expect(io.emit.calledOnceWithExactly('update-status-bar', { orderByTable: [{ numberTable: 1 }], numberTable: 1 })).to.be.true;
      
            // Restore the stubbed methods
            findByIdStub.restore();
            updateStatusProductStub.restore();
            fetchAllOrdersStub.restore();
      
            done();
          } catch (error) {
            done(error);
          }
        }, 0);
      });


      it('should fetch all orders and return the result as JSON', (done) => {
        const req = {};
        const res = {
          json: sinon.stub(),
        };
      
        // Stub the fetchAllOrders method of Order
        const fetchAllOrdersStub = sinon.stub(Order, 'fetchAllOrders').resolves([{ id: 'order1' }, { id: 'order2' }]);
      
        // Invoke the getOrders function
        getOrders(req, res);
      
        setTimeout(() => {
          try {
            // Assertions
            expect(fetchAllOrdersStub.calledOnce).to.be.true;
            expect(res.json.calledOnceWithExactly([{ id: 'order1' }, { id: 'order2' }])).to.be.true;
      
            // Restore the stubbed method
            fetchAllOrdersStub.restore();
      
            done();
          } catch (error) {
            done(error);
          }
        }, 0);
      });

})