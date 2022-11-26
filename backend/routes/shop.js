const express = require("express");

const router = express.Router();
const shopController = require("../controller/shop");

const order = [
    {
      id: 1,
      name: "הלחם שלנו",
      detail: "לחם פראנה באפייה מסורתית,שמן זית ומטבלים טעימים",
      price: 26,
    },
    {
      id: 2,
      name: "טחינה ספייס",
      detail:
        "טחינה לבנה, בשר עגל קצוץ מתובל בתערובת תבלינים מסורתית,  צנוברים ועשבי תיבול",
      price: 46,
    },
    {
      id: 3,
      name: "טחינה ספייס",
      detail:
        "טחינה לבנה, בשר עגל קצוץ מתובל בתערובת תבלינים מסורתית,  צנוברים ועשבי תיבול",
      price: 46,
    },
  ];

router.post("/api/add-order", shopController.postAddOrder);

router.use("/api", (req, res, next) => {
    res.json(order);
});

module.exports = router;