import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { type GetMovies } from "../../services/movieService";
// import { type Movie } from "../../types/movie";

const fetchMovies = async () => {
    
    const reqConfig = {
        url: "https://api.themoviedb.org/3/search/movie",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
        }
    }

    const result = await axios.get<GetMovies>(
        `${reqConfig.url}?query`,
        reqConfig
    );
    return result.data.results;
}

export default function App() {

    const { data } = useQuery({
        queryKey: ["movies"],
        queryFn: () => fetchMovies,
    });

    console.log(data);

    return (
        <>
            <h1>tanstark queries</h1>
        </>
    )







}