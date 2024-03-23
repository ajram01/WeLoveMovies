const db = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  // TODO: Write your code here
  return db (tableName)
    .where({ "reviews.review_id" : reviewId })
    .del();
}

async function list(movie_id) {
  // TODO: Write your code here
  return db ("reviews")
    .select("reviews.*")
    .modify((queryBuilder) => {
      if(movie_id) {
        queryBuilder
        .join("movies", "reviews.movie_id", "movies.movie_id")
        .where({ "movies.movie_id" : movie_id })
      }
  });
    return query.then((reviews) =>{
      return reviews;
   });
  
}

async function read(reviewId) {
  // TODO: Write your code here
  return db ("reviews")
    .select("reviews.*")
    .where({ "reviews.review_id" : reviewId })
  
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
