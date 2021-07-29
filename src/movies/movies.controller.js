const moviesService = require("./movies.service");
const reduceProperties = require("../utils/reduce-properties");

async function movieExists(req, res, next){
    const movieId = req.params.movieId;
    const movie = await moviesService.read(movieId)
    if (movie.length != 0){
        res.locals.movie = movie
        return next()
    } 
    next({
            status: 404, 
            message: `Movie for movieId: ${movieId} cannot be found`
        })
}

async function list(req, res, next){
    const showing = req.query.is_showing
    if (showing){
        const result = await moviesService.isShowing(showing)
        res.json({data: result})
    } else {
        const data = await moviesService.list()
        res.json({data: data})
    }
    
}

async function read(req, res, next){
    const [data] = res.locals.movie;
    res.json({data: data})
}

async function theaters(req, res,next){
    const movieId = req.params.movieId
    const data = await moviesService.theaters(movieId)
    res.json({data: data})
}

async function reviews(req, res, next){
    const reduceReviews = reduceProperties("review_id", {
        critic_id: ["critic", "critic_id"],
        preferred_name: ["critic", "preferred_name" ],
        surname: ["critic","surname"],
        organization_name: ["critic", "organization_name"]
    })
    const movieId = req.params.movieId;
    const data = await moviesService.reviews(movieId)
    res.send({data: reduceReviews(data)})
}



module.exports = {
    list,
    read: [movieExists, read],
    theaters: [movieExists, theaters], 
    reviews: [movieExists, reviews],
}