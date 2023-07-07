const Product = require("../Model/Product")

const getAllReviews = (req, res, next) => {
    Product.findById(req.params.id)
        .then((product) => {
            res.json(product.reviews)
        })
        .catch(next)
}

const createReview = (req, res, next) => {
    console.log(req.body)
    Product.findById(req.params.id)
        .then((product) => {
            let review = {
                "body":req.body.body,
                "rating":req.body.rating,
                "reviewer_id": req.user.userId,
                "reviewerName": req.user.username,
            }
            product.reviews.push(review)
            product.save()
                .then((b) => res.status(201).json(b.reviews))
        }).catch(next)
}

module.exports = {
    getAllReviews,
    createReview,
}