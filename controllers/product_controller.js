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
        product.image = req.file.image;
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
    getAProduct,
}