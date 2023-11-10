import { useState, useEffect, useRef } from 'react'

export default function useSearch() {
  const [busqueda, setBusqueda] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current) {
      isFirstInput.current = busqueda === ''
      return
    }

    if(busqueda === ""){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if(busqueda.match(/^\d+$/)){
      setError('No se puede buscar una pelicula con un número')
      return
    }
    if(busqueda.length < 3){
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [busqueda])

  return {busqueda, setBusqueda, error}
}