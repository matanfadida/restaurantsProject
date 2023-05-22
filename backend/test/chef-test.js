const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const Order = require('../models/Order');
const sinon = require('sinon');
const { postEditStatusProduct } = require('../controller/chef'); 

describe('Chef Controlle test', () => {

    it('should update the status of a product and emit the updated status', (done) => {
        // Mock the request and response objects
        const req = {
          body: {
            idProduct: 'product123',
            idOrder: 'order456',
            status: 'completed',
            numberTable: 5,
          },
        };
        const res = {
          json: sinon.stub(),
          status: sinon.stub().returnsThis(),
        };
    
        // Stub the necessary methods of Order and io.emit
        const findByIdStub = sinon.stub(Order, 'findById').resolves({
          products: [{ id: 'product123', status: 'pending' }],
        });
        const updateStatusProductStub = sinon.stub(Order, 'updateStatusProduct').resolves(true);
        const fetchAllOrdersStub = sinon.stub(Order, 'fetchAllOrders').resolves([
          { id: 'order456', products: [{ id: 'product123', status: 'completed' }], numberTable:5 },
        ]);
        const io = {
          emit: sinon.stub(),
        };
    
        // Invoke the postEditStatusProduct function
        postEditStatusProduct(req, res, io);
    
        // Wait for the asynchronous code to complete
        setTimeout(() => {
          try {
            // Assertions
            expect(findByIdStub.calledOnceWithExactly('order456')).to.be.true;
            expect(
              updateStatusProductStub.calledOnceWithExactly(
                'order456',
                'completed',
                [{ id: 'product123', status: 'pending' }],
                'product123'
              )
            ).to.be.true;
            expect(fetchAllOrdersStub.calledOnce).to.be.true;
            expect(io.emit.calledOnceWithExactly('update-status-product', {
              orderByTable: [
                { id: 'order456', products: [{ id: 'product123', status: 'completed' }], numberTable:5 },
              ],
              numberTable: 5,
            })).to.be.true;
            expect(res.json.calledOnceWithExactly('ok')).to.be.true;
            expect(res.status.called).to.be.false;
    
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
})