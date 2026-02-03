const express = require('express');
const ensureAuthenticated = require('../middlewares/Auth');
const router = express.Router()





router.get("/", ensureAuthenticated, (req, res) => {
    console.log("-----------logged in User-----------", req.user)
  res.status(200).json([
    {
      name: "Product 1",
      price: 100,
      description: "Product 1 description"
    },
    {
      name: "Product 2",
      price: 200,
      description: "Product 2 description"
    }
  ]);
});




module.exports = router;    