import axios from "axios";
import { type Movie } from "../types/movie";


export interface GetMovies {
    results: Movie[];
    page: number;
    total_pages: number;
}


export const fetchMovies = async (
    newQuery: string,
    page: number = 1): Promise<GetMovies> => {
    
    const reqConfig = {
        url: "https://api.themoviedb.org/3/search/movie",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
        }
    }
    
    const reply = await axios.get<GetMovies>(
        `${reqConfig.url}?query=${newQuery}&page=${page}`,
        reqConfig
    );
    return reply.data;
}

