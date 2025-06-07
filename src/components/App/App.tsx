import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import toast, { Toaster } from "react-hot-toast";
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
    const [currentQuery, setCurrentQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isError , isSuccess} = useQuery<GetMovies>({
        queryKey: ["movies", currentQuery, currentPage],
        queryFn: () => fetchMovies(currentQuery, currentPage),
        enabled: currentQuery !== "",
        placeholderData: keepPreviousData,
    })

    const handleSearch = (newQuery: string) => {
        setCurrentQuery(newQuery);
        setCurrentPage(1);
    };

    

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    const totalPages = data?.total_pages ?? 0

    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            {isSuccess && totalPages > 1 && (
                <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                forcePage={currentPage - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
                />
            )}
            {isSuccess && data?.results.length === 0 && toast.error("No movies found on your request")}
            <Toaster />  
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {data?.results && data.results.length > 0 && <MovieGrid onSelect={openModal} movies={data.results} />}
            {selectedMovie !== null && (<MovieModal onClose={closeModal} movie={selectedMovie} />)}   
        </div>
        
    )
}