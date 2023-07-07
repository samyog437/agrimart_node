const Delivery = require("../Model/Delivery");

const orderDelivery = (req, res, next) => {
  const newDelivery = {
    city: req.body.city,
    area: req.body.area,
    landmark: req.body.landmark,
    contactNo: req.body.contactNo,
    delivery_userId: req.user.userId,
    productId: req.params.id,
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
