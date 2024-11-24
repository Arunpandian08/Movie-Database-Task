import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HomePageLoader from '../../Components/HomePageLoader/HomePageLoader'

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=6916f683`);
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError(response.data.Error);
        }
      } catch (error) {
        setError('Error fetching movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Movie added to favorites!');
    } else {
      alert('Movie is already in favorites!');
    }
  };

  if (loading) return  <HomePageLoader />
  if (error) return <div classNameName='text-white'>Error: {error.message}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="container">
      <h1>{movie.Title}</h1>
      <div className="card h-100 bg-black border p-4 text-center mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={movie.Poster} alt={movie.Title} className="img-fluid rounded-start" />
          </div>
          <div className="col-md-8 text-start text-white">
            <div className="card-body">
              <p className="card-text"><strong>Release Year:</strong> {movie.Year}</p>
              <p className="card-text"><strong>Runtime:</strong> {movie.Runtime}</p>
              <p className="card-text"><strong>Language:</strong> {movie.Language}</p>
              <p className="card-text"><strong>Plot:</strong> {movie.Plot}</p>
              <p className="card-text"><strong>Genres:</strong> {movie.Genre}</p>
              <p className="card-text"><strong>Director & writer:</strong> {movie.Director} | {movie.Writer}</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
              <button onClick={addToFavorites} className="btn btn-outline-danger">Add to Favorites</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;