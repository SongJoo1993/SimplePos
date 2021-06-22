// import { Fragment } from 'react';
import { Component } from 'react';
import Header from '../../components/Header/index';
import LogBox from '../../components/MainComponents/LogBox/index';
import CalculatorBox from '../../components/MainComponents/CalculatorBox/index';
import ItemBox from '../../components/MainComponents/ItemBox/index';
import SearchBar from '../../components/MainComponents/SearchBar/index';
import './Main.scss';

class Main extends Component {
    
    state = {
        orders : []
    }

    selectItem = (name) => {
        const {inventoryData} = this.props
        // const item = e.target.innerText;
        
        // const changedQty = this.quantityChange();
        
            for(const category of inventoryData) {
                for(const section of category.sections) {
                    for(const menuItem of section.menu_items) {
                        if(menuItem.name === name) {
                            // console.log(menuItem);
                            const newItem = {id: menuItem.id.substring(0,4), name: menuItem.name, price: menuItem.price, quantity: 1}
                            
                            this.setState((prevState) => ({
                                orders: [...prevState.orders, newItem]
                            }));
                        }
                    }
                }
            }
    }

    quantityChange = (e) => {
        // Change the quantity of each item
        // value = quantity && id = item's name
        const {value, id} = e.target;
        const newOrders = this.state.orders.filter(order => (order.quantity > 0)).map(order => {
            if(order.name === id) {
                let copiedOrder = {...order}
                copiedOrder.quantity = value 
                return copiedOrder;
            }
            return order
        });

        this.setState ({
            orders: newOrders
        })
    }

    resetOrders = () => {
        return this.setState({
            orders: []
        })
    }

    // quantityChange = (e) => {
    //     // Change the quantity of each item
    //     // value = quantity && id = item's name
    //     const {value, id} = e.target;
    //     const newOrders = this.state.orders.map(order => {
    //         if(order.name === id) {
    //             let copiedOrder = {...order}
    //             copiedOrder.quantity = value 
    //             return copiedOrder;
    //         }
    //         return order
    //     });

    //     this.setState ({
    //         orders: newOrders
    //     })
    // }


    render() {
        const {inventoryData} = this.props
        // console.log(this.state.orders);
        return(
            <section className="main">
                <Header />
                <div className="main__body">
                    <div className="main__sub-box">
                        <LogBox orders={this.state.orders} onChange={this.quantityChange}/>
                        <CalculatorBox orders={this.state.orders} onSubmit={this.resetOrders}/>
                    </div>
                    <div>
                        <SearchBar />
                        <ItemBox inventoryData={inventoryData} onClick={this.selectItem} />
                    </div>
                </div>
            </section>
        )
    }
}

export default Main