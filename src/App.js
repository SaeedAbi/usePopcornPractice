import {useEffect, useState} from "react";
import NavBar from "./Components/NavBar";
import Search from "./Components/NavBar/Search";
import NumResult from "./Components/NavBar/NumResult";
import Box from "./Components/Main/ListBox";
import MovieList from "./Components/Main/MovieList";
import WatchedSummary from "./Components/Main/WatchedBox/WatchedSummary";
import WatchedList from "./Components/Main/WatchedBox/WatchedList";
import MovieDetails from "./Components/Main/MovieList/MovieDetails";
import {useMovies} from "./Hooks/useMovies";
import Main from "./Components/Main";



export const key='1068d90a'

export default function App() {
    const [query,setQuery]=useState('')
    const [selectedId,setSelectedId]=useState(null)
    const [watched, setWatched] = useState(function(){
            const storedValue = localStorage.getItem("watched");
            return JSON.parse(storedValue);
        });

   const{movies,isLoading,error}= useMovies(query,handleCloseMovie)

function handleSelectMovie (id){
setSelectedId(selectedId=> id===selectedId? null:id)
}
function handleCloseMovie (){
setSelectedId(null)
}

const handleAddWatched=(movie)=>{
        setWatched(watched=>[...watched,movie])

    // localStorage.setItem('watched',JSON.stringify([...watched,movie]))
}

function handleDeleteWatched(id){
        setWatched(watched=>watched.filter(movie=>movie.imdbID !== id))
}

    useEffect(() => {
        localStorage.setItem('watched',JSON.stringify(watched))
    }, [watched]);

  return (

      <>
        <NavBar>
            <Search query={query} setQuery={setQuery}/>
            <NumResult movies={movies}/>
        </NavBar>
        <Main>
            <Box >
                {/*{isLoading ? <Loader/>: <MovieList movies={movies}/>}*/}
                {isLoading && <Loader/>}
                {!isLoading && !error && <MovieList movies={movies} onHandleSelect={handleSelectMovie} />}
                {error && <ErrorMessage message={error}/>}
            </Box>
            <Box>

                {selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatch={handleAddWatched} watched={watched}/>:
                 <>
                    <WatchedSummary watched={watched}/>
                    <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched}/>
                 </>
            }
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
