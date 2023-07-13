const Product = require('../Model/Product')

const getAllProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.json(products)
        }).catch(next)
}

const createProduct = (req, res, next) => {
    let product = {
        title: req.body.title,
        price: req.body.price
    };
    if (req.file) {
        product.image = req.file.filename;
    }
    console.log(product)
    Product.create(product)
        .then((product) => {
            res.status(201).json({
                status:'Product has been successfully added',
                product:product
            })
        }).catch(next)
}

const updateProduct = (req, res, next) => {
    let productUpdates = {};
    if (req.body.title) {
      productUpdates.title = req.body.title;
    }
    if (req.body.price) {
      productUpdates.price = req.body.price;
    }
    if (req.file) {
      productUpdates.image = req.file.filename;
    }
    Product.findById(req.params.id)
      .then((product) => {
        if (!req.file) {
          // If no image is provided, retain the existing image
          productUpdates.image = product.image;
        }
        return Product.findByIdAndUpdate(req.params.id, productUpdates, { new: true });
      })
      .then((updatedProduct) => {
        res.json({
          status: 'Product has been successfully updated',
          product: updatedProduct,
        });
      })
      .catch(next);
  };

  const deleteAProduct = (req, res, next) => {
    Product.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ status: 'Product has been successfully deleted' });
      })
      .catch(next);
  };
  


const getAProduct = (req, res, next) => {
    Product.findById(
        req.params.id,
    )
    .then((product) => {
        res.json(product)
    }).catch(next)
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    getAProduct,
    deleteAProduct,
}