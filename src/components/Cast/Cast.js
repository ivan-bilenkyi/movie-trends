import { fetchMovieCast } from 'api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    async function fetchCast() {
      try {
        const fechedCast = await fetchMovieCast(movieId);
        setCast(fechedCast.cast);
      } catch (error) {
        toast.error('Please Try Again');
      }
    }
    fetchCast();
  }, [movieId]);
  return (
    <>
      <h3>Cast:</h3>
      {cast.length !== 0 ? (
        <ul>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              <b>{name}</b>
              <p>Character: {character}</p>
              <img
                src={`http://image.tmdb.org/t/p/w185${profile_path}`}
                alt={name}
                width="100"
                height="150"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any cast for this movie</p>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
