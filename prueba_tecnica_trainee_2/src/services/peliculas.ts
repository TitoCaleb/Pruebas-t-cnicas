const API_KEY = '4287ad07'

type Props = {
  busqueda: string
}

export const buscarPeliculas = async ({ busqueda }: Props) => {
  if (busqueda === '') {
    return {
      Response: 'False',
    }
  }

  try {
    const responseMovies = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${busqueda}`
    )
    const resultMovies: Result = await responseMovies.json()
    return resultMovies
  } catch (error) {
    throw new Error('Error en la busqueda de peliculas')
  }
}
