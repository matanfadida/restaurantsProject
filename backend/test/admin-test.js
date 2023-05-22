const Product = require('../models/Product');
const mongodb = require("mongodb");
const { expect } = require('chai');
const sinon = require('sinon');
const { getEditProduct } = require('../controller/admin');

describe('getEditProduct', () => {
  it('should return the product with the given productId', (done) => {
    const req = {
      params: {
        productId: new mongodb.ObjectId('644e3eaa3d3a4376b4d0bfa5'), // Provide a valid product ID for testing
      },
    };

    const res = {
      json: (data) => {
        expect(data._id).to.deep.equal('644e3eaa3d3a4376b4d0bfa5'); // Provide expected product data for comparison
        done();
      },
    };

    const findByIdStub = sinon.stub(Product, 'findById');
    findByIdStub.returns(
      Promise.resolve({
        _id: '644e3eaa3d3a4376b4d0bfa5',
        // Add other properties as needed for your test
      })
    );

    getEditProduct(req, res, () => {})
      .catch((err) => {
        done(err);
      })
      .finally(() => {
        findByIdStub.restore();
      });
  });

  // Write additional test cases for other scenarios if needed
});