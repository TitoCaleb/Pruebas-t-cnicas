
type Props = {
  movies: MappedMovies[]
}

export default function CardMovies({movies}: Props) {

  return (
    <ul className="grid_peliculas">
      {movies.map((movie) => (
        <li className="pelicula" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.title}</p>
          <img src={movie.Poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}
