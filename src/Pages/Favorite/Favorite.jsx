import React, { useEffect, useState } from 'react';
import './favorite.css'

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const renderStars = (rating) => {
    let stars = []
    let filledStars = Math.round(rating / 2)

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i}
          className={`bi bi-star${i <= filledStars ? '-fill' : ''} ps-1`}
          style={{ color: 'gold' }}
        >
        </i>
      )
    }
    return stars;
  }

  return (
    <section className='container'>
      {favorites ? (
        <>
          <h4>Favorite Movies</h4>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-3">
            {favorites.map((movie) => (
              <div className="col" key={movie.id}>
                <div className="card text-white h-100">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h6 className="card-title">Title: {movie.title}</h6>
                    <p className='rating'>Ratings:{renderStars(movie.vote_average)}</p>
                    <p>{movie.original_language} | {movie.release_date}</p>
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

export default Favorite