import {useState} from "react";
import {tempWatchedData} from "../index";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedList";



const WatchedBox=()=>{
    const [isOpen2, setIsOpen2] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);



   return  <div className="box">
    <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
    >
        {isOpen2 ? "–" : "+"}
    </button>
    {isOpen2 && (
        <>
<WatchedSummary watched={watched}/>
<WatchedList watched={watched}/>
        </>
    )}
</div>
}
export default WatchedBox