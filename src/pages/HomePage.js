import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../api';
import { MoviesList } from 'components/MoviesList/MoviesList';

export default function HomePage() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        const { results } = await fetchMovies();
        setFilms(results);
      } catch (error) {
        toast.error('Please Try Again');
      }
    }

    fetchMoviesData();
  }, []);

  return (
    <>
      <div>
        <h2>Trending today</h2>
        {films.length > 0 && <MoviesList films={films} />}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
