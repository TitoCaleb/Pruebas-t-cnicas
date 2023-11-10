import { buscarPeliculas } from '../services/peliculas'
import { useState, useRef, useMemo, useCallback } from 'react'

type Props = {
  busqueda: string
  sorted: boolean
}

export default function useMovies({ busqueda, sorted }: Props) {
  const [movies, setMovies] = useState<MappedMovies[]>([])
  const [loading, setLoading] = useState(false)
  const previusSearch = useRef(busqueda)

  const getMovies = useCallback(async (busqueda: string) =>  {
      if (previusSearch.current === busqueda) return
      try {
        setLoading(true)
        previusSearch.current = busqueda
        const moviesResponse: Result = await buscarPeliculas({ busqueda })
        if (moviesResponse?.Response === 'False') {
          setMovies([])
        } else {
          if(moviesResponse.Search !== undefined){
            const mappedMovies: MappedMovies[] = moviesResponse.Search.map((movie) => ({
              id: movie.imdbID,
              title: movie.Title,
              year: movie.Year,
              Poster: movie.Poster,
            }))
            setMovies(mappedMovies)
          }
        }
      } catch (error) {
        throw new Error('Error en el mapeo de datos')
      } finally {
        setLoading(false)
      }}, [])
  
  const sortedMovies = useMemo(() => {
    return sorted ? [...movies].sort((a,b) => a.title.localeCompare(b.title)) : movies 
  }, [movies, sorted])

  return { movies: sortedMovies, loading, getMovies }
}
