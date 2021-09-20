import "./DetailHeader.scss";
import { NavLink } from 'react-router-dom';

function DetailHeader (props) {
    return(
        <header className="detail-header">
            <NavLink to="/products/add-new">
                <button className="detail-header__add">ADD</button>
            </NavLink>
            {
                props.selectedUrl === undefined ? 
                <NavLink to="/products/:productId/edit">
                    <button className="detail-header__edit">EDIT</button>
                </NavLink> : 
                <NavLink to={`/products/${props.selectedUrl.params.productId}/edit`}>
                    <button className="detail-header__edit">EDIT</button>
                </NavLink>
            }
        </header>
    )
}

export default DetailHeader;