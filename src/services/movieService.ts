import axios from "axios";
import { type Movie } from "../types/movie";


export interface GetMovies {
    results: Movie[];
}


export const fetchMovies = async(newQuery: string): Promise<GetMovies> => {
    
    const reqConfig = {
        url: "https://api.themoviedb.org/3/search/movie",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
        }
    }
    
    const reply = await axios.get<GetMovies>(
        `${reqConfig.url}?query=${newQuery}`,
        reqConfig
    );
    return reply.data;
}

