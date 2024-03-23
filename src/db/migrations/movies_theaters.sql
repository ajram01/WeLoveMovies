CREATE TABLE movies_theaters(
  movie_id INT REFERENCES(movies),
  theater_id INT REFERENCES(theaters),
  is_showing BOOL
);