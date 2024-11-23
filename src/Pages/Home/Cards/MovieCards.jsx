import React, { useEffect, useState } from 'react'

const MovieCards = ({ moviesData }) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
        setFavorites(storedFavorites)
    }, [])

    const handleFavoriteToggle = (movie) => {
        const updatedFavorites = favorites.includes(movie)
            ? favorites.filter(fav => fav.id !== movie.id)
            : [...favorites, movie]

        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }

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
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-1">
            {moviesData && moviesData?.map((movie, index) => (
                <div className="col" key={index}>
                    <div className="card h-100">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="card-img-top"
                        />
                        <div className="overlay">
                            <h6 className="card-title">{movie.title}</h6>
                            <p className='ratings'> {renderStars(movie.vote_average)}</p>
                            <p>{movie.original_language} | {movie.release_date}</p>
                            <i className={`${favorites.some(fav => fav.id === movie.id) ? "bi bi-heart-fill" : "bi bi-heart"} p-1`}
                                onClick={() => handleFavoriteToggle(movie)}
                            ></i>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MovieCards