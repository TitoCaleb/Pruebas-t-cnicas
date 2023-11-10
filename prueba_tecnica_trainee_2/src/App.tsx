import { useState, useCallback } from 'react'
import './styles/App.css'
import CardMovies from './components/CardMovies'
import useMovies from './hooks/useMovies'
import useSearch from './hooks/useSearch'
import debounce from 'just-debounce-it'
type Props = {}

export default function App({}: Props) {
  const [sorted, setSorted] = useState(false)
  const { busqueda, setBusqueda, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({
    busqueda: busqueda,
    sorted: sorted,
  })

  //? Forma controlada
  const handleChangeBusqueda: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }): void => {
    const newBusqueda = target.value
    setBusqueda(newBusqueda)
    debounceGetMovies(newBusqueda)
  }

  const debounceGetMovies = useCallback(
    debounce((busqueda: string) => {
      console.log('Busqueda', busqueda)
      getMovies(busqueda)
    }, 800),
    [getMovies]
  )

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (error) return
    getMovies(busqueda)
  }

  const handleSorted = () => {
    setSorted(!sorted)
  }

  // ? Forma no controlada
  // const handleSubmit: React.FormEventHandler<HTMLFormElement> =  (e) => {
  //   e.preventDefault()
  //   const data = Object.fromEntries(new FormData(e.currentTarget))
  //   console.log(data)
  // }

  return (
    <div className="container">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
            required
            type="text"
            placeholder="Avengers, Star Wars, ..."
            onChange={handleChangeBusqueda}
          />
          <input type="checkbox" checked={sorted} onChange={handleSorted} />
          <button type="submit">Buscar</button>
        </form>
        {error && (
          <p
            style={{ color: 'red', textAlign: 'center', margin: 0, padding: 0 }}
          >
            {error}
          </p>
        )}
        {loading && <p>Cargando...</p>}
      </header>

      <main>
        {/* Peliculas */}
        {movies?.length ? (
          <CardMovies movies={movies} />
        ) : (
          <h2>No hay pelis</h2>
        )}
      </main>
    </div>
  )
}
