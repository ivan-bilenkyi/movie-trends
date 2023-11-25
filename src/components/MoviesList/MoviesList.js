import { Link, useLocation } from 'react-router-dom';

export const MoviesList = ({ films }) => {
  const location = useLocation();
  return (
    <div>
      <ul>
        {films.map(({ id, original_title }) => (
          <Link key={id} to={`/movies/${id}`} state={{ from: location }}>
            <p>{original_title}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};
