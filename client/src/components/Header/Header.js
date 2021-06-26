import { NavLink } from 'react-router-dom';
import './Header.scss';
import logo from "../../assets/Logo/pos-logo.png";

function Header() {
    return(
        <header className="header">
            <img src={logo} alt="Simple POS Logo" className="header__logo"/>
            <NavLink to="/main" className="header__main"> Main </NavLink>
            <NavLink to="/products" className="header__products"> Products </NavLink>
            <NavLink to="/" className="header__log-out"> Logout </NavLink>
        </header>
    )
}

export default Header