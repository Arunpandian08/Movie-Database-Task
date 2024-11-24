import React, { useCallback, useEffect, useState } from 'react'
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

  const handleArrowClick = useCallback(() => {
    window.scrollTo(0, 0);
  });

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 6;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pageNumber <= 4) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (pageNumber > totalPages - 4) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          pageNumber - 1,
          pageNumber,
          pageNumber + 1,
          "...",
          totalPages
        );
      }
    } return (
      <nav aria-label="Page navigation bg-black example" className="pagination-container">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
            <button
              className="page-link bg-black"
              aria-label="Previous"
              onClick={() => {
                if (pageNumber > 1) {
                  setPageNumber(pageNumber - 1)
                  handleArrowClick();
                }
              }}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pages.map((page, index) => (
            <li
              key={index}
              className={`page-item ${page === pageNumber ? "active" : ""}  bg-white`}
            >
              {typeof page === "number" ? (
                <button
                  className="page-link  bg-black"
                  onClick={() => {
                    setPageNumber(page);
                    handleArrowClick();
                  }}
                >
                  {page}
                </button>
              ) : (
                <span className="page-link  bg-black">...</span>
              )}
            </li>
          ))}
          <li
            className={`page-item ${pageNumber === totalPages ? "disabled" : ""
              }`}
          >
            <button
              className="page-link  bg-black"
              aria-label="Next"
              onClick={() => {
                if (pageNumber < totalPages) {
                  setPageNumber(pageNumber + 1)
                  handleArrowClick()
                }
              }}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    );
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
          {/* numbered pagination */}
          <div className="mt-2">
            {renderPagination()}
          </div>
        </>
      )}
    </section>
  )
}

export default Home