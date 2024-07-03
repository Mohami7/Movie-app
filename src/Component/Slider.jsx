// src/components/Slider.js
import React from 'react';
import Slider from 'react-slick';
import MovieItem from './MovieItem';

const MovieSlider = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {movies.map(movie => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </Slider>
  );
};

export default MovieSlider;
