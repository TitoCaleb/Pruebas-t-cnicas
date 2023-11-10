interface Result {
  Search?:       Search[];
  totalResults?: string;
  Response?:     string;
  Error?: string
}

interface Movies {
  Title:  string;
  Year:   string;
  imdbID: string;
  Type:   Type;
  Poster: string;
}

interface MappedMovies {
  id: string,
  title: string,
  year: string,
  Poster: string,
}