import { fetchMovieReviews } from 'api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function fetchCast() {
      try {
        const fechedReviews = await fetchMovieReviews(movieId);
        setReviews(fechedReviews.results);
      } catch (error) {
        toast.error('Please Try Again');
      }
    }
    fetchCast();
  }, [movieId]);
  return (
    <>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map(({ author, content, id }) => (
            <li key={id}>
              <p>
                <b>Author: {author}</b>
              </p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
