const knex = require("../db/connection");

function read(reviewId){
    return knex("reviews")
    .select("*")
    .where("review_id", reviewId)
}

function update(review){
    return knex("reviews")
    .where("review_id", review.review_id)
    .update(review, returning = true)
}

function destroy(reviewId){
    return knex("reviews")
    .where("review_id", reviewId)
    .del()
}

function reviews(reviewId){
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*" )
    .where("r.review_id", reviewId)
}

module.exports = {
    read,
    update,
    destroy, 
    reviews
}