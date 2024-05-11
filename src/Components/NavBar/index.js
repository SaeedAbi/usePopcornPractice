import Search from "./Search";
import Logo from "./Logo";
import NumResult from "./NumResult";


const NavBar=({children})=> {

    return ( <nav className="nav-bar">
        <Logo/>
        {children}
    </nav>)

}
export default NavBar