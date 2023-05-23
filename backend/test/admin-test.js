const Product = require('../models/Product');
const Order = require('../models/Order');
const Comment = require('../models/Comment');
const Table = require('../models/Table');
const mongodb = require("mongodb");
const { expect } = require('chai');
const sinon = require('sinon');
const { getEditProduct, getTables, postDeleteComment, postDeleteProduct, getPayOnTable, postPayOnTable } = require('../controller/admin');

describe('Admin Controller Test', () => {
  //1
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

  //2
  it('should return orders for the given numTable', async () => {
    const req = {
      params: {
        numTable: 1, // Provide a valid table number for testing
      },
    };

    const res = {
      json: (data) => {
        expect(data).to.be.an('array');
      },
    };

    const fetchAllOrdersStub = sinon.stub(Order, 'fetchAllOrders');
    fetchAllOrdersStub.returns(Promise.resolve([])); // Provide a resolved promise with mock order data

    try {
      await getTables(req, res, () => {});
      fetchAllOrdersStub.restore(); // Restore the stubbed method after the test
    } catch (err) {
      fetchAllOrdersStub.restore(); // Restore the stubbed method after the test
      throw err;
    }
  });

  //3
  it('should delete the comment with the given id', async () => {
    const req = {
      body: {
        id: '6425e0616cb5dec88671f9bd', // Provide a valid comment ID for testing
      },
    };

    const res = {
      json: (data) => {
        expect(data).to.equal('ok');
      },
    };

    const deleteCommentStub = sinon.stub(Comment, 'deleteComment');
    deleteCommentStub.returns(Promise.resolve()); // Provide a resolved promise

    try {
      await postDeleteComment(req, res, () => {});
      deleteCommentStub.restore(); // Restore the stubbed method after the test
    } catch (err) {
      deleteCommentStub.restore(); // Restore the stubbed method after the test
      throw err;
    }
  });

  //4
  it('should delete the product with the given productId', async () => {
    const req = {
      body: {
        productId: '64673d54182e45edfca52f88', // Provide a valid product ID for testing
      },
    };

    const res = {};

    const deleteByIdStub = sinon.stub(Product, 'deleteById');
    deleteByIdStub.returns(Promise.resolve()); // Provide a resolved promise

    try {
      await postDeleteProduct(req, res, () => {});
      deleteByIdStub.restore(); // Restore the stubbed method after the test
    } catch (err) {
      deleteByIdStub.restore(); // Restore the stubbed method after the test
      throw err;
    }
  });

  //5
  it('should return the sum for the given numberTable', async () => {
    const req = {
      body: {
        numTable: 1, // Provide a valid numberTable for testing
      },
    };

    const res = {
      json: (data) => {
        expect(data).to.equal(100); // Provide expected sum value for comparison
      },
    };

    const findByNumberTableStub = sinon.stub(Table, 'findByNumberTable');
    findByNumberTableStub.returns(Promise.resolve({ sum: 100 })); // Provide a resolved promise with mock table data

    try {
      await getPayOnTable(req, res, () => {});
      findByNumberTableStub.restore(); // Restore the stubbed method after the test
    } catch (err) {
      findByNumberTableStub.restore(); // Restore the stubbed method after the test
      throw err;
    }
  });
  
  //6
  it('should update the table with the given numberTable and sumPay', async () => {
    const req = {
      body: {
        numTable: 1, // Provide a valid numberTable for testing
        value: 100, // Provide a valid sumPay for testing
      },
    };

    const res = {
      json: (data) => {
        expect(data).to.equal('ok'); // Provide expected response for success case
      },
    };

    const findByNumberTableStub = sinon.stub(Table, 'findByNumberTable');
    findByNumberTableStub.resolves({});

    const saveStub = sinon.stub(Table.prototype, 'save');
    saveStub.resolves();

    try {
      await postPayOnTable(req, res, () => {});
      findByNumberTableStub.restore();
      saveStub.restore();
    } catch (err) {
      findByNumberTableStub.restore();
      saveStub.restore();
      throw err;
    }
  });

  //7
  it('should return error if table is not found', async () => {
    const req = {
      body: {
        numTable: 'table123', // Provide a valid numberTable for testing
        value: 100, // Provide a valid sumPay for testing
      },
    };

    const res = {
      json: (data) => {
        expect(data).to.equal('error'); // Provide expected response for error case
      },
    };

    const findByNumberTableStub = sinon.stub(Table, 'findByNumberTable');
    findByNumberTableStub.rejects(new Error('Table not found'));

    try {
      await postPayOnTable(req, res, () => {});
      findByNumberTableStub.restore();
    } catch (err) {
      findByNumberTableStub.restore();
      throw err;
    }
  });

  //8
  it('should return error if save operation fails', async () => {
    const req = {
      body: {
        numTable: 'table123', // Provide a valid numberTable for testing
        value: 100, // Provide a valid sumPay for testing
      },
    };

    const res = {
      json: (data) => {
        expect(data).to.equal('error'); // Provide expected response for error case
      },
    };

    const findByNumberTableStub = sinon.stub(Table, 'findByNumberTable');
    findByNumberTableStub.resolves({});

    const saveStub = sinon.stub(Table.prototype, 'save');
    saveStub.rejects(new Error('Save operation failed'));

    try {
      await postPayOnTable(req, res, () => {});
      findByNumberTableStub.restore();
      saveStub.restore();
    } catch (err) {
      findByNumberTableStub.restore();
      saveStub.restore();
      throw err;
    }
  });

});