import React, { useEffect, useState } from 'react';
import MovieItem from './MovieItem';
import { useAppSelector, useAppDispatch } from '../Redux/reduxHooks';
import { fetchMovieCompanies, fetchMovies } from '../Redux/Features/Movies/moviesSlice';
import styles from "./MovieList.module.css";  // Make sure the path is correct

interface Movie {
  id: string;
  title: string;
  reviews: number[];
  filmCompanyId: string;
}

const MovieList: React.FC = () => {
    const dispatch = useAppDispatch();

    const [sortAscending, setSortAscending] = useState(true);

    const { movies, loading, error } = useAppSelector(state => state.movies);
    const [sortedMovies, setSortedMovies] = useState([...movies]);

    useEffect(() => {
        setSortedMovies([...movies]); // Update sortedMovies when movies data changes
    }, [movies]);

    useEffect(() => {
        dispatch(fetchMovieCompanies());
        dispatch(fetchMovies());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading movies!</p>;

    return (
<div className={styles.container}>
            <h2>Welcome to the Movie Database, we have {movies.length} movies currently!</h2>
            <button onClick={() => dispatch(fetchMovies())}>Refresh</button>
            <div className={styles.header}>
                <div className={styles.titleHeader}>Title</div>
                <div className={styles.reviewHeader}>
                    <button onClick={() => {
                        setSortAscending(!sortAscending);
                        setSortedMovies([...sortedMovies].sort((a, b) => 
                            (sortAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))
                        ));
                    }}>
                        Review Average {sortAscending ? '↓' : '↑'}
                    </button>
                </div>
                <div className={styles.companyHeader}>Film Company</div>
            </div>
            {sortedMovies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
