const Delivery = require("../Model/Delivery");

const orderDelivery = (req, res, next) => {
  let newDelivery = {
    ...req.body,
    products: req.body.products,
    deliver_userId: req.user.userId,
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
    orderDelivery,
};
