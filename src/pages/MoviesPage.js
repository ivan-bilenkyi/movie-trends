import { fetchSearchMovies } from 'api';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function MoviesPage() {
  const [films, setFilms] = useState([]);
  const [params, setParams] = useSearchParams();

  const query = params.get('query') ?? '';

  useEffect(() => {
    if (query === '') {
      return;
    }
    if (films.length > 0) {
      return;
    }
    async function fetchMovies() {
      try {
        const { results } = await fetchSearchMovies(query);
        setFilms(results);
      } catch (error) {
        toast.error('Please Try Again');
      }
    }

    fetchMovies();
  }, [query, films]);

  const onSubmitForm = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const word = form.search.value.trim();

    if (!word) {
      toast.error('Заповніть поле пошуку');
      return;
    }

    setParams({ query: word });
    setFilms([]);
  };
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          defaultValue={query}
          placeholder="Search movies"
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
      {films.length > 0 && <MoviesList films={films} />}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
