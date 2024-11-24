import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './moviesList.css';
import HomePageLoader from '../../Components/HomePageLoader/HomePageLoader';

const MoviesList = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;
        setIsLoading(true)
        try {
            const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=6916f683`);
            if (response.data.Response === "True") {
                setMovies(response.data.Search);
                setError('');
            } else {
                setMovies([]);
                setError(response.data.Error);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            setError('Error fetching movies');
        } finally {
            setIsLoading(false)
        }
    };

    if(isLoading) return <HomePageLoader />
    return (
        <div className="container">
            <form onSubmit={handleSearch} className="d-flex justify-content-center" role="search">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="form-control me-2 w-50"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-secondary text-white border-white">Search</button>
            </form>
            {error &&
                <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '80svh' }}>
                    <div className="alert alert-danger">{error}</div>
                </div>
            }
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-3">
                {movies.map((movie) => (
                    <div className="col-md-3" key={movie.imdbID}>
                        <div className="card h-100 bg-black border-white">
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/500x750?text=No+Image'}
                                alt={movie.Title}
                                className="card-img-top"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title text-white">{movie.Title}</h5>
                                <p className="card-text text-white">Release Year: {movie.Year}</p>
                                <button className="btn btn-warning" onClick={() => navigate(`/movies/${movie.imdbID}`)}>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesList;