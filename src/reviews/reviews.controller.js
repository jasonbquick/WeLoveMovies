const reviewsService = require("./reviews.service")
const reduceProperties = require("../utils/reduce-properties");

async function reviewExists(req, res, next){
    const reviewId = req.params.reviewId
    const data = await reviewsService.read(reviewId)
    if (data.length != 0){
        res.locals.review = data
        return next()
    } 
    next({
            status: 404, 
            message: `Review for reviewId: ${reviewId} cannot be found`
        })
}

async function update(req, res, next){
    const reviewId = req.params.reviewId
    const updatedReview = {
        ...req.body.data, 
        review_id: reviewId
    }
    const data = await reviewsService.update(updatedReview);
  if (data === 1){
    const review = await reviewsService.reviews(reviewId)
    const reduceReviews = reduceProperties("review_id", {
        preferred_name: ["critic", "preferred_name" ],
        surname: ["critic","surname"],
        organization_name: ["critic", "organization_name"]
    })
    const [result] = reduceReviews(review)
    res.send({data: result })
  }
}

async function destroy(req, res) {
    const reviewId = req.params.reviewId
    await reviewsService.destroy(reviewId);
    res.sendStatus(204);
  }


module.exports = {
    update: [reviewExists, update],
    destroy: [reviewExists, destroy]
}