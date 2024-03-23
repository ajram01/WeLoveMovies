const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  const { reviewId } = request.params;
  const foundReview = await service.read(reviewId);
  
  if (foundReview){
    response.locals.review = foundReview;
    return next();
  } else {
    return next({ status: 404, message: "Review cannot be found."});
  }
}

async function destroy(request, response) {
  // TODO: Write your code here
  await service.destroy(response.locals.review.review_id);
  response.sendStatus(204);

}

async function list(request, response) {
  // TODO: Write your code here
  const reviews = await service.list(request.params.movieId);

  response.json({ data: reviews });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // TODO: Write your code here
  const updatedReview = {
    ...request.body.data,
    review_id: response.locals.review.review_id,
  };
  
  const data = await service.update(updatedReview);
  response.json({ data });

}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
