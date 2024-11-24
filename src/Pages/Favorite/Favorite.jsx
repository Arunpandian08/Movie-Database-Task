import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './favorite.css';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const renderStars = (rating) => {
    let stars = [];
    let filledStars = Math.round(rating / 2);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={`bi bi-star${i <= filledStars ? '-fill' : ''} ps-1`} style={{ color: 'gold' }}></i>
      );
    }
    return stars;
  };

  return (
    <section className='container'>
      {favorites.length > 0 ? (
        <>
          <h4>Favorite Movies</h4>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-3">
            {favorites.map((movie) => (
              <div className="col" key={movie.imdbID}>
                <div className="card text-white h-100">
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/500x750?text=No+Image'}
                    alt={movie.Title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h6 className="card-title">Title: {movie.Title}</h6>
                    <p className='rating'>Ratings: {renderStars(movie.imdbRating)}</p>
                    <p>{movie.Language} | {movie.Released}</p>
                    <button onClick={() => removeFromFavorites(movie.imdbID)} className="btn btn-danger">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center text-white">
          Add Favorite <i className="bi bi-bookmark"></i>
        </div>
      )}
    </section>
  );
};

export default Favorite;