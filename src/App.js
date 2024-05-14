import {useEffect, useState} from "react";
import NavBar from "./Components/NavBar";
import Main, {tempMovieData,tempWatchedData} from "./Components/Main";
import Search from "./Components/NavBar/Search";
import NumResult from "./Components/NavBar/NumResult";
import Box from "./Components/Main/ListBox";
import WatchedBox from "./Components/Main/WatchedBox";
import MovieList from "./Components/Main/MovieList";
import WatchedSummary from "./Components/Main/WatchedBox/WatchedSummary";
import WatchedList from "./Components/Main/WatchedBox/WatchedList";
import logo from "./Components/NavBar/Logo";



const key='1068d90a'

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading,setIsLoading]=useState(false )
    const [error,setError]=useState('')

    useEffect(() => {
      async function fetchMovies(){
         try {
              setIsLoading(true)
              const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=interstellar`)
              if (!res.ok) throw new Error("Something went wrong with fetching movie")
              const data = await res.json()
              setMovies(data.Search)
              setIsLoading(false);
          } catch (err) {
             setError(err.message)
         }
        }
        fetchMovies()
    },  []);

  return (

      <>
        <NavBar>
            <Search/>
            <NumResult movies={movies}/>
        </NavBar>
        <Main>
            <Box >
                {/*{isLoading ? <Loader/>: <MovieList movies={movies}/>}*/}
                {isLoading && <Loader/>}
                {!isLoading && !error && <MovieList movies={movies}/>}
                {error && <ErrorMessage message={error}/>}
            </Box>
            <Box>
                <>
                <WatchedSummary watched={watched}/>
                 <WatchedList watched={watched}/>
                </>
            </Box>
        </Main>
      </>
  );
}


const ErrorMessage=({message})=>{
    return <p className='error'>
        <span>⛔</span> {message}
    </p>
}


const Loader=()=>{
    return <p className='loader'>Loading...</p>
}