import { type Movie } from "../types/movie";

import axios from "axios";

export interface GetMovies {
    results: Movie[];
}

export const reqConfig = {
    url: "https://api.themoviedb.org/3/search/movie",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    }
}

export const fetchMovies = async(newQuery: string): Promise<Movie[]> => {
    const result = await axios.get<GetMovies>(
        `${reqConfig.url}?query=${newQuery}`,
        reqConfig
    );
    return result.data.results;
}

