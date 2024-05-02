import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../Redux/reduxHooks';
import { submitReview, clearSelectedMovie } from '../Redux/Features/Movies/moviesSlice';
import styles from "./SelectedMovie.module.css";

const SelectedMovie: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedMovie = useAppSelector(state => state.movies.activeMovie);
    const [review, setReview] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        if (input.length > 100) {
            setError('Review must be under 100 characters');
        } else {
            setError(null);
            setReview(input);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (review.length > 100) {
            setError('Review must be under 100 characters');
            return;
        }

        if (selectedMovie) {
            const response = await dispatch(submitReview({
                movieId: selectedMovie.id,
                review
            }));

            if (submitReview.fulfilled.match(response)) {
                setReview(""); 
                dispatch(clearSelectedMovie()); 
                alert('Review submitted successfully!');
            } else if (submitReview.rejected.match(response)) {
                alert('Failed to submit review: ' + (response.error.message || 'Unknown error'));
            }
        }
    };

    if (!selectedMovie) return null;

    return (
        <div className={styles.container}>
            <h3>You have selected {selectedMovie.title}</h3>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <p>Please leave a review below:</p>
            )}
            <form onSubmit={handleSubmit}>
                <label>
                    Review:
                    <input
                        type="text"
                        value={review}
                        onChange={handleInputChange}
                        className={styles.input}
                        maxLength={101} //just let them make a cheeky wee error
                    />
                </label>
                {!error && (
                    <button type="submit" className={styles.button} disabled={!review}>
                        Submit Review
                    </button>
                )}
            </form>
        </div>
    );
};

export default SelectedMovie;
