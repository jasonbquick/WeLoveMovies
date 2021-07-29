const knex = require("../db/connection");

function list(){
    return knex("movies").select("*")
}

function isShowing(){
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where("mt.is_showing", true)
}

function read(movieId){
    return knex("movies")
    .select("*")
    .where("movie_id", movieId)
}

function theaters(movieId){
    return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.*")
    .where("mt.movie_id", movieId)
    .where("mt.is_showing", true)
}

function reviews(movieId){
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*" )
    .where("r.movie_id", movieId)
}
module.exports ={
    list,
    isShowing, 
    read,
    theaters,
    reviews,
}