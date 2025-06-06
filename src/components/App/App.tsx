import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import css from "./App.module.css"
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies } from "../../services/movieService";
import { type Movie } from "../../types/movie"
import { type GetMovies } from "../../services/movieService";



export default function App() {

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
    const [currentSearchQuery, setCurrentSearchQuery] = useState("");

    const { data, isLoading, isError } = useQuery<GetMovies>({
        queryKey: ["movies"],
        queryFn: () => fetchMovies(currentSearchQuery),
        enabled: currentSearchQuery !== "",
    })
        


    

    const handleSearch = async (newQuery: string) => {
        setCurrentSearchQuery(newQuery)
    };

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            <Toaster />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {data?.results && data.results.length > 0 && (<MovieGrid onSelect={openModal} movies={data.results} />) }
            {selectedMovie !== null && (<MovieModal onClose={closeModal} movie={selectedMovie} />)}   
        </div>
        
    )
}