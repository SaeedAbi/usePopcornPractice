import WatchMovie from "./WatchMovie";

const WatchedList=({watched,onDeleteWatched})=> {
    return <ul className="list">
        {watched.map((movie) => (
<WatchMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}/>
        ))}
    </ul>
}
export default WatchedList