const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const { movieId } = request.params;
  const foundMovie = await service.read(movieId);
  
  if(foundMovie){
    response.locals.movie = foundMovie;
    return next();
  } else {
    return next({ status: 404, message: "Movie cannot be found."})
  }
}

async function read(request, response) {
  // TODO: Add your code here
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  // TODO: Add your code here.
  const movies = await service.list
  response.json({ data: movies });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
