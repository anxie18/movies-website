import type { Movie } from "@/types/movie"
import data from "@/data/movies.json"

const { movies } = data as { movies: Movie[] }

export function getAllMovies(): Movie[] {
  return movies
}

export function getMovieByTitle(title: string): Movie | undefined {
  return movies.find((m) => m.title === title)
}

export function searchMovies(query: string): Movie[] {
  const q = query.toLowerCase().trim()
  if (!q) return movies
  return movies.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.director.name.toLowerCase().includes(q) ||
      m.genre.some((g) => g.toLowerCase().includes(q))
  )
}
