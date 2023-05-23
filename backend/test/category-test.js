const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const Category = require('../models/Category');
const sinon = require('sinon');
const { postAddCategories, getCategories } = require('../controller/category'); // Replace with the actual path to your module file

describe('Category Controlle test', () => {
    it('should add new categories and return "ok" as JSON', (done) => {
        const req = {
          body: {
            categories: [
              { value: 'category1', label: 'Category 1' },
              { value: 'category2', label: 'Category 2' },
            ],
            worker: 'worker1',
          },
        };
        const res = {
          json: sinon.stub(),
        };
      
        // Stub the necessary methods of Category
        const deleteAllStub = sinon.stub(Category, 'deleteAll').resolves();
        const fetchAllCategoriesByWorkerStub = sinon.stub(Category, 'fetchAllCategoriesByWorker').resolves([
          { value: 'existingCategory1', label: 'Existing Category 1' },
          { value: 'existingCategory2', label: 'Existing Category 2' },
        ]);
        const saveStub = sinon.stub(Category.prototype, 'save').resolves();
      
        // Invoke the postAddCategories function
        postAddCategories(req, res);
      
        setTimeout(() => {
          try {
            // Assertions
            expect(deleteAllStub.calledOnceWithExactly('worker1')).to.be.true;
            expect(fetchAllCategoriesByWorkerStub.calledOnceWithExactly('worker1')).to.be.true;
            expect(saveStub.calledTwice).to.be.true;
            expect(res.json.calledOnceWithExactly('ok')).to.be.true;
      
            // Restore the stubbed methods
            deleteAllStub.restore();
            fetchAllCategoriesByWorkerStub.restore();
            saveStub.restore();
      
            done();
          } catch (error) {
            done(error);
          }
        }, 0);
      });

      it('should fetch all categories and return them as JSON', (done) => {
        const req = {};
        const res = {
          json: sinon.stub(),
        };
      
        // Stub the necessary method of Category
        const fetchAllCategoriesStub = sinon.stub(Category, 'fetchAllCategories').resolves([
          { value: 'category1', label: 'Category 1' },
          { value: 'category2', label: 'Category 2' },
        ]);
      
        // Invoke the getCategories function
        getCategories(req, res);
      
        setTimeout(() => {
          try {
            // Assertions
            expect(fetchAllCategoriesStub.calledOnce).to.be.true;
            expect(res.json.calledOnceWithExactly([
              { value: 'category1', label: 'Category 1' },
              { value: 'category2', label: 'Category 2' },
            ])).to.be.true;
      
            // Restore the stubbed method
            fetchAllCategoriesStub.restore();
      
            done();
          } catch (error) {
            done(error);
          }
        }, 0);
      });
})
