import { useState } from "react";
import NavBar from "./Components/NavBar";
import Main, {tempMovieData} from "./Components/Main";



export default function App() {
    const [movies, setMovies] = useState(tempMovieData);
  return (

      <>
        <NavBar movies={movies}/>

        <Main movies={movies}/>
      </>
  );
}





