import "../NavBar/NavBar.scss";
// import {Link} from 'react-router-dom';
// import * as FaIcons from "react-icons/fa";
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Menu, {SubMenu, Item as MenuItem } from 'rc-menu';

class NavBar extends Component {
    keyGenerator () {
        
    }
    
    getMenu = () => {
        return(
            <Menu mode="inline" className="nav-bar">
                {this.props.data.map(category => {
                    return (
                        <SubMenu key={(Math.random())} title={category.category} className="nav-bar__category">
                            {category.sections.map(item => {
                                return (
                                    <SubMenu key={(Math.random())} title={item.section_name} className="nav-bar__section">
                                        {item.menu_items.map(menu => {
                                            return (
                                                <NavLink key={menu.id} to={`/products/${menu.id}/detail`} className="nav-bar__item-link" onClick={this.props.onClick} >
                                                    <MenuItem key={menu.id} className="nav-bar__item" id={menu.id}>{menu.name}</MenuItem>
                                                </NavLink>
                                            )
                                        })}
                                    </SubMenu>
                                )
                            })}
                        </SubMenu>
                    )
                })}
            </Menu>
        )
    }

    render() {
        return(
            <div>
                <div>{this.getMenu()}</div>
            </div>
        )
    }
}

export default NavBar
