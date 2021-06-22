import { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import Header from '../../components/Header/index';
import NavBar from '../../components/ProductsComponents/NavBar/index';
import DetailBox from '../../components/ProductsComponents/DetailBox/index';
import AddBox from '../../components/ProductsComponents/AddBox/index';
import axios from 'axios';
import "./Products.scss";


class Products extends Component {

    state = {
        selectedItem: {}
    }

    clickedItem = (e) => {
        const {id} = e.target;
        const {inventoryData} = this.props

        if(inventoryData) {
            for(const category of inventoryData) {
                for(const section of category.sections) {
                    for(const menuItem of section.menu_items) {
                        if(menuItem.id === id) {
                            const selectedItem = {
                                category: category.category,
                                sections: section.section_name,
                                id: menuItem.id.substring(0,4),
                                name: menuItem.name,
                                description: menuItem.description,
                                availability: menuItem.availability,
                                price: menuItem.price,
                                quantity: 1
                            }
                            this.setState({
                                selectedItem: selectedItem
                            });
                        }
                    }
                }
            }
        }
    } 

    deleteItem = (e) => {
        let categoryInput = e.target.name.split(",")[0];
        let sectionInput = e.target.name.split(",")[1];
        console.log(categoryInput, sectionInput);
        const {inventoryData} = this.props
        
        if(inventoryData) {
            for(const category of inventoryData) {
                for(const section of category.sections) {
                    for(const menuItem of section.menu_items) {
                        if(menuItem.name === this.state.selectedItem.name) {
                            // console.log(menuItem.name)
                            // console.log(this.state.selectedItem.name)
                            // console.log(categoryInput, sectionInput);
                            this.props.deleteInventoryItem(categoryInput, sectionInput, menuItem.id);
                            this.props.history.push(`/main`);
                        }
                    }
                }
            }
        }
    }


    render() {
        const {inventoryData} = this.props;
        console.log(this.props);
        return(
            <section className="products">
                <Header />
                <div className="products__body">
                    <NavBar data={inventoryData} onClick={this.clickedItem}/>
                    <Switch>
                        <Route path={`${this.props.match.url}/`} exact render={(routerProps) => ( 
                            <DetailBox selectedItem={this.state.selectedItem} onClick={this.deleteItem} {...routerProps}/>)}/>
                        <Route path={`${this.props.match.url}/add-new`} render={(routerProps) => (
                            <AddBox inventoryData = {this.state.inventoryData} getInventoryItems={this.props.getInventoryItems} {...routerProps} />)}/>
                        <Route path={`${this.props.match.url}/:productId/detail`} render={(routerProps) => ( 
                            <DetailBox selectedItem={this.state.selectedItem} onClick={this.deleteItem} {...routerProps}/>)}/>
                    </Switch>
                </div>
            </section>
        )
    }
}


export default Products