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

const deleteReview = (req, res, next) => {
    const productId = req.params.id;
    const reviewId = req.params.reviewId;
    console.log(productId)

    Product.findById(productId)
      .then((product) => {
        const reviewIndex = product.reviews.findIndex((review) => review._id == reviewId);
        if (reviewIndex === -1) {
          return res.status(404).json({ message: 'Review not found' });
        }
        if (product.reviews[reviewIndex].reviewer_id.toString() !== req.user.userId && req.user.role !== 'Admin') {
          return res.status(403).json({ message: 'You are not authorized to delete this review' });
        }
        product.reviews.splice(reviewIndex, 1);
       product.save()
          .then(() => res.status(204).end())
          .catch(next);
      })
      .catch(next);
  };

module.exports = {
    getAllReviews,
    createReview,
    deleteReview
}