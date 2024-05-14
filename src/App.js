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

    useEffect(() => {
        setIsLoading(true)
      async function fetchMovies(){
            const res=  await fetch(`http://www.omdbapi.com/?apikey=${key}&s=interstellar`)
            const data=await res.json()
          setMovies(data.Search)
          setIsLoading(false)
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
                {isLoading ? <Loader/>: <MovieList movies={movies}/>}
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





const Loader=()=>{
    return <p className='loader'>Loading...</p>
}