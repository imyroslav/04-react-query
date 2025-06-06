import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css"
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies } from "../../services/movieService";
import { type Movie } from "../../types/movie"


export default function App() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    // const notifyError = () =>
        


    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    const handleSearch = async (newQuery: string) => {
        try {
            setIsLoading(true);
            setError(false);
            const newMovies = await fetchMovies(newQuery);
            if (newMovies.length === 0) {
            toast.error("No any movies found on your request")
            }
            setMovies(newMovies);
        } catch {
            setError(true);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            <Toaster />
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
            {selectedMovie !== null && (<MovieModal onClose={closeModal} movie={selectedMovie} />)}   
        </div>
        
    )
}