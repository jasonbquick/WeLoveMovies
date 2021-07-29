const knex = require("../db/connection");

function list() {
    return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")
    .orderBy("t.theater_id")
}

module.exports = {
    list,
}