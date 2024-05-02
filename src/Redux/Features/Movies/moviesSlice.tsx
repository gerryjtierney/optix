import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getMovieCompanies, getMovies, postReview } from './moviesService';

import { RootState } from '../../store';

// Define a type for the slice state
interface Movie {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
}

interface MovieCompany {
  id: string;
  name: string;
}

interface selectedMovie{
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
}

interface MoviesState {
  movieCompanies: MovieCompany[];
  movies: Movie[];
  loading: boolean;
  error: string | null;
  activeMovie: Movie | null;
}

// Define the initial state using that type
const initialState: MoviesState = {
  movieCompanies: [],
  movies: [],
  activeMovie: null,
  loading: false,
  error: null,
};

// Define a type for the review submission argument
interface ReviewSubmission {
  movieId: string;
  review: string;
}


// Helper function to extract the error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const fetchMovieCompanies = createAsyncThunk(
  'movies/fetchMovieCompanies',
  async (_, { rejectWithValue }) => {
    try {
      return await getMovieCompanies();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      return await getMovies();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const submitReview = createAsyncThunk(
  'movies/submitReview',
  async (reviewSubmission: ReviewSubmission, { rejectWithValue, getState }) => {

    try {
      alert("submitting review")
      const { movieId, review } = reviewSubmission;
      return await postReview({ movieId, review });
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setActiveMovie(state, action: PayloadAction<string>) {
      state.activeMovie = state.movies.find(movie => movie.id === action.payload) || null;
    },
    clearSelectedMovie(state) {
      state.activeMovie = null; // Set activeMovie to null
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieCompanies.fulfilled, (state, action: PayloadAction<MovieCompany[]>) => {
        state.movieCompanies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovieCompanies.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitReview.fulfilled, (state) => {
        // handle the fulfilled state if needed
        state.loading = false;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  }
});

export const { setActiveMovie, clearSelectedMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
