import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3000';


interface MovieCompany {
  id: string;
  name: string;
 
}

interface Movie {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;

}

interface Review {
  review: string;
}


export const getMovieCompanies = async (): Promise<MovieCompany[]> => {
  const response = await axios.get<MovieCompany[]>(`${API_URL}/movieCompanies`);
  return response.data; 
};

export const getMovies = async (): Promise<Movie[]> => {
  const response = await axios.get<Movie[]>(`${API_URL}/movies`);
  return response.data;
};

export const postReview = async ({ movieId, review }: { movieId: string; review: string }): Promise<any> => {
  const response = await axios.post(`${API_URL}/submitReview`, { movieId, review });
  return response.data;
};

