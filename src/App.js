import { useState } from "react";
import NavBar from "./Components/NavBar";
import Main, {tempMovieData,tempWatchedData} from "./Components/Main";
import Search from "./Components/NavBar/Search";
import NumResult from "./Components/NavBar/NumResult";
import Box from "./Components/Main/ListBox";
import WatchedBox from "./Components/Main/WatchedBox";
import MovieList from "./Components/Main/MovieList";
import WatchedSummary from "./Components/Main/WatchedBox/WatchedSummary";
import WatchedList from "./Components/Main/WatchedBox/WatchedList";





export default function App() {
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);
  return (

      <>
        <NavBar>
            <Search/>
            <NumResult movies={movies}/>
        </NavBar>
        <Main>
            <Box >
                <MovieList movies={movies}/>
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





