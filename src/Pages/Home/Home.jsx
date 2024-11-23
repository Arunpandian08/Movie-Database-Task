import React, { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios';
import HomePageLoader from '../../Components/HomePageLoader/HomePageLoader';
import MovieCards from './Cards/MovieCards';

const Home = ({ searchTerm }) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [moviesData, setMoviesData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchMoviesData(pageNumber, searchTerm)
  }, [pageNumber, searchTerm])


  const fetchMoviesData = async (pageNumber, searchTerm) => {
    setIsLoading(true)
    try {

      const options = {
        method: 'GET',
        url: searchTerm ? 'https://api.themoviedb.org/3/search/movie' : 'https://api.themoviedb.org/3/discover/movie',
        params: {
          include_adult: 'false',
          include_video: 'false',
          language: 'en-US',
          page: pageNumber,
          region: 'india',
          sort_by: 'popularity.desc',
          query: searchTerm
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTZmZTkxMGExNmFmNzI2NDAzMWQwZDNkNTFlZGE4YiIsIm5iZiI6MTczMjM1OTc0NC43ODY0NzQ1LCJzdWIiOiI2NzQxYjUyNzlmNDBhN2FhZjZlYTBmNjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HB81v1v7mJ-MSg23qxsDEwDAtl5F7-oTsrh-XjvESpM'
        }
      };

      const response = await axios.request(options);
      setMoviesData(response.data.results)
      setTotalPages(response.data.total_pages)
    } catch (error) {
      console.error('Failed to fetch movies data', error);
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleArrowClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className='container'>
      {isLoading ? (
        <HomePageLoader />
      ) : (
        <>
          {/* slider content  */}
          {/* movies title and pagination next prev buttons */}
          <div className="home-nav sticky-top">
            <div className="title">
              <h4>List of Movies</h4>
            </div>
            <div className="arrow-group d-flex px-4">
              <i
                className={`bi bi-arrow-left-circle fs-4 ${pageNumber === 1 ? 'disabled' : ''}`}
                onClick={() => {
                  if (pageNumber > 1) {
                    setPageNumber(prev => prev - 1);
                    handleArrowClick(); 
                  }
                }}
              ></i>
              <i
                className={`bi bi-arrow-right-circle fs-4 ms-3 ${pageNumber === totalPages ? 'disabled' : ''}`}
                onClick={() => {
                  if (pageNumber < totalPages) {
                    setPageNumber(prev => prev + 1);
                    handleArrowClick(); 
                  }
                }}
              ></i>
            </div>
          </div>
          {/* movies poster with data */}
          <MovieCards moviesData={moviesData} />
        </>
      )}
    </section>
  )
}

export default Home