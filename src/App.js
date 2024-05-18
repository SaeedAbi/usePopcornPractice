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
import MovieDetails from "./Components/Main/MovieList/MovieDetails";



export const key='1068d90a'

export default function App() {
    const [query,setQuery]=useState('')
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading,setIsLoading]=useState(false )
    const [error,setError]=useState('')
    const [selectedId,setSelectedId]=useState(null)

function handleSelectMovie (id){
setSelectedId(selectedId=> id===selectedId? null:id)
}
function handleCloseMovie (){
setSelectedId(null)
}

const handleAddWatched=(movie)=>{
        setWatched(watched=>[...watched,movie])
}

function handleDeleteWatched(id){
        setWatched(watched=>watched.filter(movie=>movie.imdbID !== id))
}

    useEffect(() => {
        const controller= new AbortController()

      async function fetchMovies(){
         try {
              setIsLoading(true)
             setError('')
              const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`, {signal: controller.signal})
              if (!res.ok) throw new Error("Something went wrong with fetching movie")
              const data = await res.json()
             if (data.response==='false') throw new Error('Movie not found')
              setMovies(data.Search)
             setError('')
          } catch (err) {
             console.error(err.message)
             if (err.name!== 'AbortError'){
             setError(err.message)
             }
         } finally {
             setIsLoading(false);

         }
        }

        if(query.length< 3) {
            setMovies([])
            setError('')
            return
        }

        fetchMovies()
        return function (){
            controller.abort()
        }
    },  [query]);

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
