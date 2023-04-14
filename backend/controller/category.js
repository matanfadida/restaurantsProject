const Category = require("../models/Category");

exports.getCategories = (req, res, next) => {
  Category.fetchAllCategories()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddCategories = (req, res, next) => {
  const categoriesFromUser = req.body.categories;
  console.log(categoriesFromUser);
  Category.fetchAllCategories()
    .then((categories) => {
        categoriesFromUser.forEach((category) => {
            console.log(category.value)
        if (!categories.includes(category.value)) {
          var newCategory = new Category(category.value, category.label);
          newCategory
            .save()
            .then((result) => console.log("Update"))
            .catch((err) => console.log(err));
        }
      });
      res.json("ok");
    })
    .catch((err) => {
      console.log(err);
    });
};
