import React from 'react';
import { useAppSelector, useAppDispatch } from '../Redux/reduxHooks';
import { setActiveMovie } from '../Redux/Features/Movies/moviesSlice';
import styles from './MovieItem.module.css'; // Import the CSS module

interface Movie {
  id: string;
  title: string;
  reviews: number[];
  filmCompanyId: string;
}

interface Props {
  movie: Movie;
}

const MovieItem: React.FC<Props> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const activeMovieId = useAppSelector(state => state.movies.activeMovie?.id);
  const movieCompanies = useAppSelector(state => state.movies.movieCompanies);
  const averageRating = movie.reviews.reduce((acc, rating) => acc + rating, 0) / movie.reviews.length;

  const handleClick = () => {
    dispatch(setActiveMovie(movie.id));
  };

  // Find the movie company name using the filmCompanyId
  const movieCompanyName = movieCompanies.find(company => company.id === movie.filmCompanyId)?.name || "Unknown Company";

  const containerClass = `${styles.container} ${movie.id === activeMovieId ? styles.active : ''}`;

  return (
    <div className={containerClass} onClick={handleClick}>
      <h3 className={styles.title}>{movie.title}</h3>
      <div className={styles.detail}>Rating: {averageRating.toFixed(2)}</div>
      <div className={styles.detail}>{movieCompanyName}</div>
    </div>
  );
};

export default MovieItem;
