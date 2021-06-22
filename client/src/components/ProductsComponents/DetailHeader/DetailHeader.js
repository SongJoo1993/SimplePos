import "./DetailHeader.scss";
import { NavLink } from 'react-router-dom';

function DetailHeader (props) {
    return(
        <header className="detail-header">
            <NavLink to="/products/add-new">
                <button className="detail-header__add">Add</button>
            </NavLink>
            <button className="detail-header__edit">Edit</button>
            <button className="detail-header__delete">Delete</button>
        </header>
    )
}

export default DetailHeader;