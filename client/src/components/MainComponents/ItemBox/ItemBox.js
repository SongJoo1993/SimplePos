import "./ItemBox.scss";
import { Component } from 'react';
import ItemList from "./ItemList/index";

class ItemBox extends Component {

    state =  {
        inventoryData: []
    }

    

    render() {
        return(
            <h1 className="itemBox">
                ItemBox
                <ItemList inventoryData={this.props} />
            </h1>
        )
    }
}


export default ItemBox