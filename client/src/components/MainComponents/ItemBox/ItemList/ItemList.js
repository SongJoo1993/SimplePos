import "./ItemList.scss";
import { Component } from 'react';

class ItemList extends Component {

    
    
    render() {
        let inventoryData = this.props.inventoryData; 
        console.log(inventoryData);
        return(
            <div className="item-list">
            <section>
                <div>
                    { inventoryData.length === 0 ? "Item List is being loaded" : inventoryData.map(item => {
                        return <div key={inventoryData.indexOf(item)} className="item-list__category"> {item.category} </div>
                        }
                    )}
                </div>
            </section>
        </div>
        )
    }
}

export default ItemList;