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

const getDeliveryData = (req, res, next) => {
  const userId = req.user.userId
  Delivery.find({
    deliver_userId: userId,
  })
  .populate({
    path: 'products.productId',
    select: 'title price image',
  })
    .then((deliveries) => {
      res.status(200).json({
        status:"success",
        deliveries,
      });
      // console.log(`the delivery data is ${deliveries}`)
    })
      .catch(next)
}

module.exports = { 
    orderDelivery,
    getDeliveryData,
};
