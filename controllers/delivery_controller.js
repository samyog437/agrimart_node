const Delivery = require("../Model/Delivery");

const orderDelivery = (req, res, next) => {
  const newDelivery = {
    ...req.body,
    products: req.body.products,
  };

  Delivery.create(newDelivery)
    .then((createdDelivery) => {
      res.status(201).json({
        status: 'Product has been ordered successfully',
        delivery: createdDelivery,
      });
    })
    .catch(next);
};

module.exports = { 
    orderDelivery 
};
