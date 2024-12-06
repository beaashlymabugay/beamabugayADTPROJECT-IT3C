import { Outlet } from 'react-router-dom';
import './movie.css';

const Movie = () => {
  return (
    <>
    <h1 style={{
        color: "#f08a8a", // Soft pinkish color
        fontSize: "2rem",
        fontWeight: "bold",
        borderBottom: "3px solid #ffb7b7", // Light pink border
        paddingBottom: "15px",
        marginBottom: "20px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Subtle shadow for elegance
      }}>
        Movies
      </h1>

      <Outlet />
    </>
  );
};

export default Movie;