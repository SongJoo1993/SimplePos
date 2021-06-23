import { NavLink } from 'react-router-dom';
import './Header.scss';


function Header() {
    return(
        <header className="header">
            <div className="header__logo"> Simple POS </div>
            <NavLink to="/main" className="header__main"> Main </NavLink>
            <NavLink to="/products" className="header__products"> Products </NavLink>
            <NavLink to="/" className="header__log-out"> Logout </NavLink>
        </header>
    )
}

export default Header