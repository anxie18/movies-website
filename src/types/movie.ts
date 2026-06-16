export interface Director {
  name: string
  region: string
}

export interface Movie {
  title: string
  director: Director
  year: number
  genre: string[]
  rating: number
  duration: number
  region: string[]
  summary: string
}
