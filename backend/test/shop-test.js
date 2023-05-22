const { expect } = require('chai');
const sinon = require('sinon');
const { postAddOrder, getProducts, getProduct, postUpdateRating, postDeleteProductFromOrder } = require('../controller/shop');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Comment = require('../models/Comment');

describe('Shop Controller Test', () => {
  it('should add a new order and emit the updated orders', (done) => {
    // Mock the request and response objects
    const req = {
      body: {
        numberTable: 5,
        price: 50,
        products: [
          { id: 'product123', name: 'Product 1' },
          { id: 'product456', name: 'Product 2' },
        ],
      },
    };
    const res = {
      json: sinon.stub(),
    };

    // Stub the Order.save method
    sinon.stub(Order.prototype, 'save').resolves({ id: 'order789', numberTable: 5 });

    // Stub the Order.fetchAllOrders method
    sinon.stub(Order, 'fetchAllOrders').resolves([
      { id: 'order123', numberTable: 3 },
      { id: 'order456', numberTable: 4 },
      { id: 'order789', numberTable: 5 },
    ]);

    // Create a stub for the io object
    const io = {
      emit: sinon.stub(),
    };

    // Invoke the postAddOrder function
    postAddOrder(req, res, io);

    // Wait for the asynchronous code to complete
    setTimeout(() => {
      try {
        // Assertions
        expect(Order.prototype.save.calledOnce).to.be.true;
        expect(Order.fetchAllOrders.calledOnce).to.be.true;
        expect(io.emit.calledOnceWithExactly('new-order', [
          { id: 'order123', numberTable: 3 },
          { id: 'order456', numberTable: 4 },
          { id: 'order789', numberTable: 5 },
        ])).to.be.true;
        expect(res.json.calledOnceWithExactly('ok')).to.be.true;

        // Restore the stubbed methods
        Order.prototype.save.restore();
        Order.fetchAllOrders.restore();

        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });

  it('should return all products', (done) => {
    // Mock the request and response objects
    const req = {};
    const res = {
      json: sinon.stub(),
    };

    // Stub the Product.fetchAllProducts method
    sinon.stub(Product, 'fetchAllProducts').resolves([
      { id: 'product123', name: 'Product 1', price: 10 },
      { id: 'product456', name: 'Product 2', price: 20 },
    ]);

    // Invoke the getProducts function
    getProducts(req, res);

    // Wait for the asynchronous code to complete
    setTimeout(() => {
      try {
        // Assertions
        expect(Product.fetchAllProducts.calledOnce).to.be.true;
        expect(res.json.calledOnceWithExactly([
          { id: 'product123', name: 'Product 1', price: 10 },
          { id: 'product456', name: 'Product 2', price: 20 },
        ])).to.be.true;

        // Restore the stubbed method
        Product.fetchAllProducts.restore();

        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });


  it('should return product details without comments', (done) => {
    // Mock the request and response objects
    const req = {
      body: {
        id: 'product123',
        getComment: false,
      },
    };
    const res = {
      json: sinon.stub(),
    };

    // Stub the Product.findById method
    sinon.stub(Product, 'findById').resolves({
      id: 'product123',
      name: 'Product 1',
      price: 10,
    });

    // Invoke the getProduct function
    getProduct(req, res);

    // Wait for the asynchronous code to complete
    setTimeout(() => {
      try {
        // Assertions
        expect(Product.findById.calledOnceWithExactly('product123')).to.be.true;
        expect(res.json.calledOnceWithExactly({
          id: 'product123',
          name: 'Product 1',
          price: 10,
        })).to.be.true;

        // Restore the stubbed method
        Product.findById.restore();

        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });

  it('should return product details with comments', (done) => {
    // Mock the request and response objects
    const req = {
      body: {
        id: 'product123',
        getComment: true,
      },
    };
    const res = {
      json: sinon.stub(),
    };

    // Stub the Product.findById method
    sinon.stub(Product, 'findById').resolves({
      id: 'product123',
      name: 'Product 1',
      price: 10,
    });

    // Stub the Comment.fetchAllCommentForProduct method
    sinon.stub(Comment, 'fetchAllCommentForProduct').resolves([
      { id: 'comment456', text: 'Comment 1' },
      { id: 'comment789', text: 'Comment 2' },
    ]);

    // Invoke the getProduct function
    getProduct(req, res);

    // Wait for the asynchronous code to complete
    setTimeout(() => {
      try {
        // Assertions
        expect(Product.findById.calledOnceWithExactly('product123')).to.be.true;
        expect(Comment.fetchAllCommentForProduct.calledOnceWithExactly('product123')).to.be.true;
        expect(res.json.calledOnceWithExactly({
          product: {
            id: 'product123',
            name: 'Product 1',
            price: 10,
          },
          comments: [
            { id: 'comment456', text: 'Comment 1' },
            { id: 'comment789', text: 'Comment 2' },
          ],
        })).to.be.true;

        // Restore the stubbed methods
        Product.findById.restore();
        Comment.fetchAllCommentForProduct.restore();

        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });


  it('should update product rating without adding a comment', (done) => {
    // Mock the request and response objects
    const req = {
      params: {
        productId: 'product123',
      },
      body: {
        rating: 4,
        comment: '',
      },
    };
    const res = {
      json: sinon.stub(),
    };

    // Stub the Product.findById method
    sinon.stub(Product, 'findById').resolves({
      id: 'product123',
      rating: 3,
      counterRating: 5,
    });

    // Stub the Product.updateRating method
    sinon.stub(Product, 'updateRating').resolves('updated');

    // Invoke the postUpdateRating function
    postUpdateRating(req, res);

    // Wait for the asynchronous code to complete
    setTimeout(() => {
      try {
        // Assertions
        expect(Product.findById.calledOnceWithExactly('product123')).to.be.true;
        expect(Product.updateRating.calledOnceWithExactly('product123', 3.1666666666666665, 6)).to.be.true;
        expect(res.json.calledOnceWithExactly('updated')).to.be.true;

        // Restore the stubbed methods
        Product.findById.restore();
        Product.updateRating.restore();

        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });

  it('should update product rating and add a comment', (done) => {
    // Mock the request and response objects
    const req = {
      params: {
        productId: 'product123',
      },
      body: {
        rating: 4,
        comment: 'Great product!',
      },
    };
    const res = {
      json: sinon.stub(),
    };

    // Stub the Product.findById method
    sinon.stub(Product, 'findById').resolves({
      id: 'product123',
      rating: 3,
      counterRating: 5,
    });

    // Stub the Product.updateRating method
    sinon.stub(Product, 'updateRating').resolves('updated');

    // Stub the Comment.save method
    sinon.stub(Comment.prototype, 'save').resolves('commentSaved');

    // Invoke the postUpdateRating function
    postUpdateRating(req, res);

    // Wait for the asynchronous code to complete
    setTimeout(() => {
      try {
        // Assertions
        expect(Product.findById.calledOnceWithExactly('product123')).to.be.true;
        expect(Product.updateRating.calledOnceWithExactly('product123', 3.1666666666666665, 6)).to.be.true;
        expect(Comment.prototype.save.calledOnce).to.be.true;
        expect(res.json.calledOnceWithExactly('ok')).to.be.true;

        // Restore the stubbed methods
        Product.findById.restore();
        Product.updateRating.restore();
        Comment.prototype.save.restore();

        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });


  it('should delete a product from an order and return all orders', (done) => {
    // Mock the request and response objects
    const req = {
      body: {
        ordId: 'order123',
        proGuidId: 'product123',
        numberTable: 5,
      },
    };
    const res = {
      json: sinon.stub(),
    };

    // Stub the Order.deleteByGuidId method
    sinon.stub(Order, 'deleteByGuidId').resolves('deleted');

    // Stub the Order.fetchAllOrders method
    sinon.stub(Order, 'fetchAllOrders').resolves(['order1', 'order2']);

    // Invoke the postDeleteProductFromOrder function
    postDeleteProductFromOrder(req, res);

    // Wait for the asynchronous code to complete
    setTimeout(() => {
      try {
        // Assertions
        expect(Order.deleteByGuidId.calledOnceWithExactly('order123', 'product123')).to.be.true;
        expect(Order.fetchAllOrders.calledOnce).to.be.true;
        expect(res.json.calledOnceWithExactly(['order1', 'order2'])).to.be.true;

        // Restore the stubbed methods
        Order.deleteByGuidId.restore();
        Order.fetchAllOrders.restore();

        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });


});
