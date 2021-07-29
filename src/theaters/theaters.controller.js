const theatersService = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res, next) {
    const reduceTheaters = reduceProperties("theater_id", {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        runtime_in_minutes: ["movies", null,  "runtime_in_minutes"], 
        rating: ["movies", null, "rating"], 
        description: ["movies", null, "description"],
        image_url: ["movies", null, "image_url"],
        is_showing: ["movies",null,  "is_showing"],
    })
    const result = await theatersService.list()
    res.send({data: reduceTheaters(result)})
}
        
module.exports = {
    list,
}