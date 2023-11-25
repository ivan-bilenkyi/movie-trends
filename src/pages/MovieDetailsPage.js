import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovieDetails } from 'api';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');
  useEffect(() => {
    if (!movieId) {
      return;
    }
    async function getDetails() {
      try {
        const fechedDetails = await fetchMovieDetails(movieId);
        setMovie(fechedDetails);
      } catch (error) {
        toast.error('Please Try Again');
      }
    }

    getDetails();
  }, [movieId]);
  if (!movie) {
    return;
  }

  const {
    poster_path,
    title,
    original_title,
    release_date,
    genres,
    vote_average,
    overview,
  } = movie;
  return (
    <>
      <section>
        <Link to={backLinkRef.current}>
          <b>Back to movies</b>
        </Link>
        <h2>Movie Details:</h2>

        {movie && (
          <>
            <div>
              <img
                src={`http://image.tmdb.org/t/p/w342${poster_path}`}
                alt={title}
                width="200"
              />
              <div>
                <h3>{original_title}</h3>
                <p>
                  <b>Release date:</b> {release_date}
                </p>
                <p>
                  <b>Genres:</b>{' '}
                  {genres.map(({ name }) => `${name.toLowerCase()} | `)}
                </p>
                <p>
                  <b>Ranking:</b> {vote_average}
                </p>
                <p>
                  <b>Overview:</b> {overview}
                </p>
              </div>
            </div>
            <h3>Additional information:</h3>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>

            <Outlet />
          </>
        )}
      </section>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
